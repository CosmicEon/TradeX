import { Logger } from '@services/logger';
import { Guard } from '@services/guard';
import { GlobalStore } from '../stores';
import { TokenService } from '@services/tokenService';
import { AjaxService } from '@services/AjaxService';
import { IdentityService } from '@services/IdentityService';
import { EventService } from '@services/eventService';
import { LodashService } from '@services/LodashService';

declare global {
  namespace jc {
    interface GetServiceOverloads {
      getService?(name: 'logger'): Logger;
      getService?(name: 'guard'): Guard;
      getService?(name: 'global-store'): GlobalStore;
      getService?(name: 'event'): EventService;
      getService?(name: 'token'): TokenService;
      getService?(name: 'ajax'): tradeX.IAjaxService;
      getService?(name: 'identity'): IdentityService;
      getService?(name: 'lodash'): LodashService;
    }
  }
}

export function registerServices(core: jc.Core): void {
  core.addService('logger', Logger);
  core.addService('guard', Guard);
  core.addService('global-store', GlobalStore);
  core.addService('event', EventService);
  core.addService('token', TokenService);
  core.addService('ajax', AjaxService);
  core.addService('identity', IdentityService);
  core.addService('lodash', LodashService);
}
