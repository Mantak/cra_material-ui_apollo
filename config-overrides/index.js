const { injectBabelPlugin } = require('react-app-rewired');
const rewireGraphql = require('./graphql_tag');

module.exports = function override(config, env) {
  // @修饰器
  config = injectBabelPlugin('transform-decorators-legacy', config);
  // 支持graphql tag
  config = rewireGraphql(config);
  return config;
};
