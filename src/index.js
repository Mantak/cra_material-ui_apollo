import React from 'react';
import { render } from 'react-dom';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ToastContainer } from 'react-toastify';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './styles/theme.js';
import 'react-toastify/dist/ReactToastify.css';
import './styles/prism.css';

// 注册service workder
import registerServiceWorker from './registerServiceWorker';
import client from './client';

import ErrorBoundary from './HOCs/ErrorBoundary';
import ScrollToPosition from './HOCs/ScrollToPosition';
import Sign from './layouts/Sign';
import Main from './layouts/Main';

registerServiceWorker();

render(
  <MuiThemeProvider theme={theme}>
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <Router>
          <ScrollToPosition>
            <Switch>
              <Route path="/sign" component={Sign} />
              <Route path="/" component={Main} />
            </Switch>
          </ScrollToPosition>
        </Router>
      </ApolloProvider>
      <ToastContainer />
    </ErrorBoundary>
  </MuiThemeProvider>,
  document.getElementById('root')
);
