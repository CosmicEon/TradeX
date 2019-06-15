declare global {
  namespace jc {
    interface Core extends GetServiceOverloads {
      addService?(name: string, service: ServiceClass): void;
    }

    interface Sandbox extends GetServiceOverloads {
    }

    interface GetServiceOverloads {
      getService?<T extends object>(name: string): T;
    }
  }
}

interface ServiceClass {
  new(core: jc.Core): any;
}

const servicesStack: string[] = [];
const servicesContainer: Record<string, { instance: any; type: ServiceClass; }> = {};
const hasOwnProperty = Object.prototype.hasOwnProperty;

function isServiceBeingInstantiated(id: string): boolean {
  return servicesStack.indexOf(id) > -1;
}

function addService(this: jc.Core, name: string, serviceClass: ServiceClass): void {
  if (!name) {
    throw new Error('addService(): name must be a non empty string');
  }

  if (hasOwnProperty.call(servicesContainer, name)) {
    throw new Error(`addService(): "${name}" has already been added`);
  }

  if (typeof serviceClass !== 'function') {
    throw new Error(`addService(): "${name}" class is not a function constructor`);
  }

  servicesContainer[name] = {
    type: serviceClass,
    instance: null
  };
}

function getService<T extends object>(this: jc.Core, name: string): T {
  const serviceData = servicesContainer[name];
  if (!serviceData) {
    throw new Error(`getService(): ${name} service not found`);
  }

  if (serviceData.instance) {
    return serviceData.instance;
  }

  if (isServiceBeingInstantiated(name)) {
    throw new Error(`getService(): service circular dependency ${servicesStack.join(' -> ')} -> ${name}`);
  }

  servicesStack.push(name);
  serviceData.instance = new serviceData.type(this);
  servicesStack.pop();

  return serviceData.instance as T;
}

function sandboxGetService<T extends object>(this: jc.Sandbox, name: string): T {
  return this._extensionsOnlyCore.getService<T>(name);
}

export function services(): jc.Extension {
  return {
    name: 'services',
    install: (core) => {
      (function(sandbox: jc.Sandbox) {
        core.addService = addService;
        core.getService = getService;
        sandbox.getService = sandboxGetService;
      }(core.Sandbox.prototype));

      return {};
    },
  };
}
