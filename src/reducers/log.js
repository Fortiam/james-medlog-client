const initalState = {
    comments : [{
        comment : "placeholder 1st comment",
    }],
    loading : false,
    error : null
};
export function logsReducer (state = initalState, action){
    switch(action.type){
        case('LOGS_REQUEST'):
        return Object.assign({}, state, {
            loading : true,
            error : null
        });
        case('GET_LOGS_SUCCESS'):
        const newArrayData = state.comments.map(object=> {
            if(object.comment === action.data.comment){
                return action.data;
            } else {
                return object;
            }
        });
        return Object.assign({}, state, {
            loading : false,
            error : null,
            comments : [...newArrayData]
        });
        case('LOGS_ERROR'):
        return Object.assign({}, state, {
            loading : false,
            error : action.error
        });
        case('GET_ALL_LOGS_SUCCESS'):
            const newState = Object.assign({}, state, {loading : false, error: null, comments : [...action.data]});
            return newState;
        case('CREATE_LOGS_SUCCESS'):
            const newpostState = Object.assign({}, state, {loading : false, error: null, comments : [...state.comments, action.data]});
            return newpostState;
        case('EDIT_LOGS_SUCCESS'):
            const neweditState = state.comments.map(object=> {
                if(object.id === action.data.id){
                    return action.data;
                } else {
                    return object;
                }
            });
            return Object.assign({}, state, {loading: false, error: null, comments : [...neweditState]});
        case('REMOVE_LOGS_SUCCESS'):
            const newdeleteState = Object.assign({}, state, {loading: false, error: null, comments: [...action.data]});
            return newdeleteState;
        case('LOGS_LOGOUT'):
            const logoutState = Object.assign({}, state, {loading: false, error: null, comments : [{
                 "comment" : "placeholder 1st comment",
                  }]});
            return logoutState;
    default : return state;
    }
};