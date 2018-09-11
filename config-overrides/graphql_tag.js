const path = require('path');
const { getLoader } = require('react-app-rewired');

const gqlExtension = /\.(graphql|gql)$/;

function rewireGraphQLTag(config) {
  // Exclude .graphql files from the file-loader
  const fileLoader = getLoader(config.module.rules, rule => {
    return (
      rule.loader &&
      typeof rule.loader === 'string' &&
      rule.loader.indexOf(`${path.sep}file-loader${path.sep}`) !== -1
    );
  });
  fileLoader.exclude.push(gqlExtension);
  // Add loader for graphQL files
  const graphQLRule = {
    test: gqlExtension,
    loader: 'graphql-tag/loader',
    exclude: /node_modules/,
  };
  config.module.rules.push(graphQLRule);
  config.resolve.extensions.push('.graphql');
  return config;
}

module.exports = rewireGraphQLTag;
