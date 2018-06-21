import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import routes from './Routes'

const AppRoute = props => (
    <BrowserRouter>
        <Switch>
            { routes.map(route => <Route 
                                    key={route.path} 
                                    path={route.path} 
                                    exact 
                                    component={route.component} 
                                  /> 
                        )}
        </Switch>
    </BrowserRouter>   
)

export default connect(state => ({}))(AppRoute)