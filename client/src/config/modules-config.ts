import * as modules from '../features/index';

export function registerModules(core: jc.Core): void {
  const constants = core.constants;

  core.addModule(constants.MODULE_MASTER_PAGE, sb => new modules.MasterPageModule(sb));
  core.addModule(constants.MODULE_HOME, sb => new modules.HomeModule(sb));
  core.addModule(constants.MODULE_HEADER, sb => new modules.HeaderModule(sb));
  core.addModule(constants.MODULE_FOOTER, sb => new modules.FooterModule(sb));
  core.addModule(constants.MODULE_CONTAINER, sb => new modules.ContainerModule(sb));
  core.addModule(constants.MODULE_EVENTS, sb => new modules.EventsModule(sb));
  core.addModule(constants.MODULE_TEST, sb => new modules.TestRouteModule(sb));
  core.addModule(constants.MODULE_AUTH, sb => new modules.AuthModule(sb));
  core.addModule(constants.MODULE_BET_OPTIONS, sb => new modules.BetOptionsModule(sb));
  core.addModule(constants.MODULE_ADMIN, sb => new modules.AdminModule(sb));

  if (module.hot) {
    module.hot.accept('../features/index', () => {
      core.startModule(core.constants.MODULE_MASTER_PAGE);
    });
  }
}