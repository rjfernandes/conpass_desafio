import StoreAction from './StoreAction'

const users = JSON.parse(localStorage.getItem('users') || '[]')

const initialState = { users: users }

export const storeReducer = (state = initialState, action) => {
    switch(action.type) {
        case StoreAction.add:
            return {...state, users: [...state.users, ...[action.payload]]}
            
        default:
            return state
    }
}