declare global {
  namespace jc {
    interface Core {
      constants?: typeof CONSTANTS;
    }

    interface Sandbox {
      constants?: typeof CONSTANTS;
    }
  }
}

namespace CONSTANTS {
  export const DOMAIN = 'http://localhost:5001';

  export const MODULE_MASTER_PAGE = 'root';
  export const MODULE_HEADER = 'header';
  export const MODULE_CONTAINER = 'container';
  export const MODULE_HOME = 'home';
  export const MODULE_TEST = 'test';
  export const MODULE_FOOTER = 'footer';
  export const MODULE_EVENTS = 'events';
  export const MODULE_AUTH = 'auth-module';
  export const MODULE_REGISTER = 'register';
  export const MODULE_BET_OPTIONS = 'bet-options';
  export const MODULE_ADMIN = 'admin';

  export const MESSAGE_CHANGE_CONTENT = 'MESSAGE_CHANGE_CONTENT';
  export const MESSAGE_TOGGLE_AUTH = 'MESSAGE_TOGGLE_AUTH';
  export const MESSAGE_EVENT_ID = 'MESSAGE_EVENT_ID';
  export const MESSAGE_CHANGE_EVENT = 'MESSAGE_CHANGE_EVENT';

}

export function constants(): jc.Extension {
  return {
    name: 'constants',
    install: (core) => {
      (function(sandbox: jc.Sandbox) {
        core.constants = sandbox.constants = CONSTANTS;
      }(core.Sandbox.prototype));

      return {};
    },
  };
}
