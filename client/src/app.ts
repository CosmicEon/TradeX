import '../styles/style.css';

import './polyfills';
import { Core } from 'justcore';
import { registerModules } from './config/modules-config';
import { registerServices } from './config/services-config';
import { constants } from './extensions/constants';
import { services } from './extensions/services';
import { reactAdapter } from './extensions/react-adapter';
import { mobxAdapter } from './extensions/mobx-adapter';
import { GlobalStore } from '@stores/GlobalStore';
import { router } from 'justcore-extension-router';
import { registerRoutes } from './config/routes-config';

declare global {
  namespace jc {
    interface Core {
      globalStore?: GlobalStore;
    }

    interface Sandbox {
      globalStore?: GlobalStore;
    }
  }
}

const app: jc.Core = new Core();
app.use([
  // extensions here
  constants(),
  services(),
  reactAdapter(),
  mobxAdapter(),
  router()
]);

app.init(() => {

  // on init logic here
  registerServices(app);
  (function(sb: jc.Sandbox) {
    app.globalStore = sb.globalStore = new GlobalStore(app);
  }(app.Sandbox.prototype));
  registerModules(app);
  registerRoutes(app);

  const token = localStorage.getItem('access_token');

  if (token && token !== 'undefined') {
    const idenity = app.getService('identity');
    idenity.saveUser(token);
  }

  app.startModule(app.constants.MODULE_MASTER_PAGE, {
    props: {
      root: document.getElementById('root')
    }
  });
});