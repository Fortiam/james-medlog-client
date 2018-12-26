const initalState = {
    listOfOwnedByUser : [{
    name : null,
    age : null,
    gender : null,
    height : null,
    weight : null,
    doctor : { name : null, email : null},
    allergies : []
    }],
    loading : false,
    error : null
};
//the list is an array of objects.
//each patient is 1 object and the array is all owned by currentUser
export function patienceReducer (state = initalState, action){
    //do action stuff
    switch(action.type){
        case('PATIENT_INFO_REQUEST'):
        return Object.assign({}, state, {
            loading : true,
            error : null
        });
        case('GET_PATIENT_INFO_SUCCESS'):
        const newArrayData = state.listOfOwnedByUser.map(object=> {
            if(object.name === action.data.name){
                console.log("here test is: ", action.data);//<-- test?
                return action.data;
            } else {
                return object;
            }
        });
        return Object.assign({}, state, {
            loading : false,
            error : null,
            listOfOwnedByUser : [...newArrayData]
        });
        case('PATIENT_INFO_ERROR'):
        return Object.assign({}, state, {
            loading : false,
            error : action.error
        });
        case('GET_ALL_PATIENTS_INFO_SUCCESS'):
            const newState = Object.assign({}, state, {loading : false, error: null, listOfOwnedByUser : [...action.data]});
            return newState;
        case('CREATE_NEW_PATIENT_SUCCESS'):
            const newpostState = Object.assign({}, state, {loading : false, error: null, listOfOwnedByUser : [...state.listOfOwnedByUser, action.data]});
            return newpostState;
        case('EDIT_PATIENT_SUCCESS'):
        console.log("the goods: ", action.data);//<<--- test tis ---------------------
            const neweditState = state.listOfOwnedByUser.map(object=> {
                if(object.name === action.data.name){
                    return action.data;
                } else {
                    return object;
                }
            });
            return Object.assign({}, state, {loading: false, error: null, listOfOwnedByUser : [...neweditState]});
        case('REMOVE_PATIENT_INFO_SUCCESS'):
            const newdeleteState = Object.assign({}, state, {loading: false, error: null, listOfOwnedByUser: [...action.data]});
            return newdeleteState;
    default : return state;
    }
};