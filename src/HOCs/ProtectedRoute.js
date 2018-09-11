import React from 'react';
import { withRouter } from 'react-router';
import { Route, Redirect } from 'react-router-dom';
import { AuthConsumer } from './AuthContext';

@withRouter
class ProtectedRoute extends React.Component {
  render() {
    const {
      history: { location },
      component: Component,
      ...rest
    } = this.props;
    const returnUrl = location.pathname + location.search + location.hash;
    return (
      <AuthConsumer>
        {({ isAuth }) => (
          <Route
            {...rest}
            render={props =>
              isAuth ? <Component {...props} /> : <Redirect to={`/sign/in?return=${returnUrl}`} />
            }
          />
        )}
      </AuthConsumer>
    );
  }
}

export default ProtectedRoute;
