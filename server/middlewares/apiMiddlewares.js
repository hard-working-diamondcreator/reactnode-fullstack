const globby = require('globby');
const path = require('path');

module.exports = function apiMiddlewares(app) {
  apiRoutes(app);
};

function apiRoutes(app) {
  /* eslint global-require: "off" */
  globby([`${__dirname}/../features/*/**/*.policy.js`]).then((policies) => {
    policies.forEach((policyPath) => {
      require(path.resolve(policyPath)).invokeRolesPolicies();
    });
  });

  // ========= Public routes
  // Examples public routes
  require('../features/examples')(app);
  // App public routes
  require('../features/app/app.routes')(app);
  // Content public routes
  require('../features/content/content-public.routes')(app);
  // ========= Secure routes
  // User's feature, this incldues auth middleware as well
  require('../features/users')(app);
  // Content public routes
  require('../features/content/content.routes')(app);

  // get all registered routes of express
  // app._router.stack.forEach((r: any) => {
  //   if (r.route && r.route.path) {
  //     console.log(r.route.path)
  //   }
  // });
}
