import StoreAction from './StoreAction'

const initialState = { users: [] }

export const storeReducer = (state = initialState, action) => {
    switch(action.type) {
        case StoreAction.add:
            let newState = {...state, users: [...state.users, ...[action.payload]]}
            delete newState.tmpUser
            return newState
            
        case StoreAction.tmpUser:
            return {...state, tmpUser: action.payload}

        default:
            return state
    }
}