import React from 'react'
import { Router, Switch, Route } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import { Provider } from 'react-redux'
import { store } from './store/Store'
import Routes from './route/Routes'

/** 
 * CSS 
 */
import './assets/css/theme.scss'

const history = createBrowserHistory()

export default () => (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          { Routes.map(route => <Route key={route.path} path={route.path} exact component={route.component} /> )}
        </Switch>
      </Router>        
    </Provider>
)
