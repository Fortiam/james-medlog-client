const initalState = {
    username: null,
    firstName : null,
    lastName : null,
    email : null, 
    useEmailForApi: false,
    loading: false,
    error : null
};

export function registerReducer (state=initalState, action){
    if (action.type === 'REGISTER_REQUEST') {
        return Object.assign({}, state, {
            loading: true,
            error: null
        });
    }
    else if (action.type === 'REGISTER_SUCCESS') {
        return Object.assign({}, state, {
            loading: false,
            username: action.username,
            firstName : action.firstName,
            lastName : action.lastName,
            email : action.email, 
            useEmailForApi: action.useEmailForApi,
            error : null
        });
    }
    else if (action.type === 'REGISTER_ERROR') {
        const tired = Object.assign({}, action.error.error);
        return Object.assign({}, state, {
            loading: false,
            error: {"status": tired.status, "reason": tired.reason}
        });
    }
    else if (action.type === 'REGISTER_LOGOUT'){
        return Object.assign({}, state, {
            loading : false,
            username: null,
            firstName : null,
            lastName : null,
            email : null, 
            useEmailForApi: false,
            error: null
        });
    }
    return state;
}
