import { createElement } from 'react';
import { render } from 'react-dom';
import { configure } from 'mobx';

function enableDevtools() {
  require(['mobx-react-devtools'], mobxDevtools => {
    const wrapper = document.createElement('div');
    wrapper.id = 'mobx-devtools-wrapper';
    document.body.appendChild(wrapper);
    render(createElement(mobxDevtools.default), wrapper);
  });
}

function onAppInit(this: jc.Core, next: jc.Func<void>): void {
  next();

  const isDebug = this.globalStore.debug;

  configure({
    enforceActions: isDebug,
    computedRequiresReaction: isDebug,
    disableErrorBoundaries: isDebug
  });

  if (isDebug) {
    enableDevtools();
  }
}

export function mobxAdapter(): jc.Extension {
  return {
    name: 'mobx-adapter',
    install: (core) => {
      return {
        onCoreInit: onAppInit
      };
    },
  };
}
