import React from 'react';
import localForage from 'localforage';
import apolloClient from '../client';
import { tokenName } from '../config';

import CURRENT_USER_QUERY from '../graphql/users/current_user_query.gql';

const AuthContext = React.createContext();
const AuthConsumer = AuthContext.Consumer;

class AuthProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: { isAuth: false },
      loaded: false,
    };
    this.getAuth.bind(this)();
  }
  async getAuth() {
    const token = await localForage.getItem(tokenName);
    // 没token，返回默认state
    if (!token) {
      this.setState({ loaded: true });
      return;
    }
    // 有token，带token请求数据
    apolloClient
      .query({ query: CURRENT_USER_QUERY, fetchPolicy: 'network-only' })
      .then(res => {
        // TODO 这里要返回新的token，来代替旧token
        this.setState({ auth: { isAuth: true, currentUser: res.data.currentUser }, loaded: true });
      })
      .catch(error => {
        localForage.removeItem(tokenName);
        this.setState({ loaded: true });
      });
  }
  render() {
    const { auth, loaded } = this.state;
    if (!loaded) return null;
    return <AuthContext.Provider value={auth}>{this.props.children}</AuthContext.Provider>;
  }
}
export { AuthProvider, AuthConsumer };
