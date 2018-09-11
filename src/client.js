import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
// 使用apollo做state store
import { withClientState } from 'apollo-link-state';

import { dedupLink, authLink, errorsLink, infosLink, httpLink, socketLink } from './apollo/links';
import defaultState from './apollo/state_defaults';
import stateMutations from './apollo/state_mutations';

const cache = new InMemoryCache().restore(window.__APOLLO_STATE__);

const stateLink = withClientState({
  cache,
  defaults: defaultState,
  resolvers: { Mutation: stateMutations },
});

export default new ApolloClient({
  link: ApolloLink.split(
    // split based on operation type
    ({ query }) => {
      const { kind, operation }: any = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    ApolloLink.from([authLink, errorsLink, infosLink, socketLink]),
    ApolloLink.from([dedupLink, authLink, errorsLink, infosLink, stateLink, httpLink])
  ),
  cache,
});
