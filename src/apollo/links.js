import localForage from 'localforage';
import { toast } from 'react-toastify';

import { ApolloLink } from 'apollo-link';
import { DedupLink } from 'apollo-link-dedup';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { createHttpLink } from 'apollo-link-http';

import * as AbsintheSocket from '@absinthe/socket';
import { createAbsintheSocketLink } from '@absinthe/socket-apollo-link';
import { Socket as PhoenixSocket } from 'phoenix';

import { apiURLs, tokenName } from '../config';

export const dedupLink = new DedupLink();

// 添加一个带token的中间件，如果有token就会带上
export const authLink = setContext(async (_, { headers }) => {
  const token = await localForage.getItem(tokenName);
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : null,
    },
  };
});

export const errorsLink = onError(({ graphQLErrors, networkError }) => {
  let description = '';
  graphQLErrors &&
    graphQLErrors.forEach((e, i) => {
      description += `错误${i + 1}: ${e.message} `;
    });

  toast.error(description);
});

export const infosLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    const operationName = Object.keys(response.data);
    const payload = response.data[operationName] || null;
    if (payload && payload.messages && payload.messages.length > 0) {
      payload.messages.forEach(message => {
        const description = message.message ? message.message : message;
        toast.error(description);
      });
    }
    return response;
  });
});

export const httpLink = createHttpLink({ uri: apiURLs.serverUrl });

export const socketLink = createAbsintheSocketLink(
  AbsintheSocket.create(new PhoenixSocket(apiURLs.socketUrl))
);
