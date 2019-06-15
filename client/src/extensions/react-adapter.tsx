import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { ErrorBoundary } from '@elements/index';

declare global {
  namespace jc {
    interface Sandbox {
      mountView?<TProps>(
        View: React.ComponentClass<TProps>,
        props: TProps,
        root: HTMLElement): void;
    }

    interface Module {
      root?: HTMLElement;
    }
  }
}

function mountView<TProps>(
  this: jc.Sandbox,
  View: React.ComponentClass<TProps>,
  props: TProps,
  root: HTMLElement): void {
  if (!View) {
    unmountComponentAtNode(root);
    return;
  }

  normalizeViewDisplayName(View, this.moduleId);
  render(
    <ErrorBoundary>
      <View {...props} />
    </ErrorBoundary>,
    root
  );
}

function normalizeViewDisplayName(View: React.ComponentClass, moduleId: string): void {
  View.displayName = View.displayName || `${moduleId}-view`;
}

function setRoot(this: jc.Module, next: jc.Func<void>, props?: { root?: HTMLElement; }): void {
  this.root = props ? props.root : null;
  next();
}

function unmountView(this: jc.Module, next: jc.Func<void>): void {
  next();

  if (this.root) {
    unmountComponentAtNode(this.root);
    this.root = null;
  }
}

export function reactAdapter(): jc.Extension {
  return {
    name: 'react-adapter',
    install: (core): Partial<jc.PluginsMap> => {
      (function(sb: jc.Sandbox) {
        sb.mountView = mountView;
      }(core.Sandbox.prototype));

      return {
        onModuleInit: setRoot,
        onModuleDestroy: unmountView,
      };
    },
  };
}
