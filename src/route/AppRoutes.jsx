import React from 'react'
import { connect } from 'react-redux'
import createBrowserHistory from 'history/createBrowserHistory'
import { Router, Switch, Route } from 'react-router'
import routes from './Routes'

const history = createBrowserHistory()

const AppRoute = props => (
    <Router history={history}>
        <Switch>
            { routes.map(route => <Route 
                                    key={route.path} 
                                    path={route.path} 
                                    exact 
                                    component={route.component} 
                                  /> 
                        )}
        </Switch>
    </Router>   
)

export default connect(state => state)(AppRoute)