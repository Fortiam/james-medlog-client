const initalState = {
    manyMeds : [{
        name : null,
        dosage : null,
        rateAmount : null,
        // rateInterval : null,
        howLongAmount : null,
        // howLongForDays : null
    }],
    loading : false,
    error : null
};
export function medsReducer (state = initalState, action){
    switch(action.type){
        case('MEDS_REQUEST'):
        return Object.assign({}, state, {
            loading : true,
            error : null
        });
        case('GET_MEDS_SUCCESS'):
        const newArrayData = state.manyMeds.map(object=> {
            if(object.name === action.data.name){
                return action.data;
            } else {
                return object;
            }
        });
        return Object.assign({}, state, {
            loading : false,
            error : null,
            manyMeds : [...newArrayData]
        });
        case('MEDS_ERROR'):
        return Object.assign({}, state, {
            loading : false,
            error : action.error
        });
        case('GET_ALL_MEDS_SUCCESS'):
            const newState = Object.assign({}, state, {loading : false, error: null, manyMeds : [...action.data]});
            return newState;
        case('CREATE_MEDS_SUCCESS'):
            const newpostState = Object.assign({}, state, {loading : false, error: null, manyMeds : [...state.manyMeds, action.data]});
            return newpostState;
        case('EDIT_MEDS_SUCCESS'):
            const neweditState = state.manyMeds.map(object=> {
                if(object.id === action.data.id){
                    return action.data;
                } else {
                    return object;
                }
            });
            return Object.assign({}, state, {loading: false, error: null, manyMeds : [...neweditState]});
        case('REMOVE_MEDS_SUCCESS'):
            const newdeleteState = Object.assign({}, state, {loading: false, error: null, manyMeds: [...action.data]});
            return newdeleteState;
    default : return state;
    }
};