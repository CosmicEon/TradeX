interface RouteConfig {
  path: string;
  Module: string;
}

export function registerRoutes(core: jc.Core): void {

  const routes: RouteConfig[] = [
    { path: '/home', Module: core.constants.MODULE_HOME },
    { path: '/admin', Module: core.constants.MODULE_ADMIN },

  ];

  const routesMap = routes.reduce((map, route) => {
    map[route.path] = route;
    return map;
  }, Object.create(null) as Record<string, RouteConfig>);

  const handleRouteChange = (match: jc.RouteMatch) => {
    core.stopModule(core.constants.MODULE_CONTAINER);
    core.globalStore.changeRoute({
      Module: routesMap[match.path].Module,
      ...match
    });

    core.startModule(core.constants.MODULE_CONTAINER, {
      props: {
        root: document.getElementById('container')
      }
    });

  };

  const router = core.router;
  router.defaultHash = '/home';
  routes.forEach((route) => router.route(route.path, handleRouteChange));
}