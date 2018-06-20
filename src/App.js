import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store/Store'
import AppRoutes from './route/AppRoutes'

/** 
 * CSS 
 */
import './assets/css/theme.scss'

export default () => (
    <Provider store={store}>
        <AppRoutes />
    </Provider>
)
