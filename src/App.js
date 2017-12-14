import React, { Component } from 'react';
import { Router, Route, useRouterHistory } from 'react-router/es';
import { Provider } from 'react-redux';
import createHistory from 'history/lib/createBrowserHistory';
import store from './redux/store';
import './styles/app.scss';
import Main from './components/Main';
import withGATracker from './components/withGATracker';
import * as Navigator from './helpers/Navigator';

const browserHistory = useRouterHistory(createHistory)();

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Router history={browserHistory}>
            <Route path={ Navigator.defaultRoute() } component={ withGATracker(Main) }/>
            <Route path={ Navigator.languageRoute() } component={ withGATracker(Main) }/>
          </Router>
        </Provider>
      </div>
    );
  }
};

export default App;
