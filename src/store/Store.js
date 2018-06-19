import { createStore } from 'redux'
import { storeReducer } from './StoreReducer'

export const store = createStore(storeReducer)