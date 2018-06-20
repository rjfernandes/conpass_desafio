import { createStore } from 'redux'
import { storeReducer } from './StoreReducer'

export const store = createStore(storeReducer)

store.subscribe(() => {
    try {
        localStorage.setItem('users', JSON.stringify(store.getState().users || []))
    } catch(error) {
        console.log('error', error)
    }
})