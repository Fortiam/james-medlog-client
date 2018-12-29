import moment from 'moment';
const initalState = {
    allOfTheEvents: [{
        patientId: null,
        medId : null,
        title : null,
        start: null,
        end: null,
        userId : null
    }],
    timeIsNow: moment().format(),
    currentEvent : [{
        patientId: null,
        medId : null,
        title : null,
        start: null,
        end: null,
        userId: null
    }],
    loading : false,
    error : null
};

export function eventsReducer (state = initalState, action){
    if(action.type === 'EVERY_EVENTS_REQUEST'){
        return Object.assign({}, state, {
            loading : true,
            error : null
        });
    }
    else if (action.type === 'EVERY_EVENTS_ERROR'){
        return Object.assign({}, state, {
            loading : false,
            error : action.error
        });
    }
    else if (action.type === 'FETCH_ONE_EVENT_SUCCESS') {
        return Object.assign({}, state, {
            loading : false,
            error : null,
            currentEvent : [action.data]
        });
    }
    else if (action.type === 'FETCH_ALL_EVENTS_SUCCESS') {
        return Object.assign({}, state, {
            loading : false,
            error : null,
            allOfTheEvents : [...action.data]
        });
    }
    else if (action.type === 'ADD_EVENT_SUCCESS') {
        let newState = Object.assign({}, state, { 
            loading : false,
            error: null,
            allOfTheEvents: [ ...state.allOfTheEvents, ...action.data
            ],
            currentEvent : [action.data[0]]
        });
        return newState;
    }
    else if (action.type === 'UPDATE_EVENT_SUCCESS'){
        const updatedArray = state.allOfTheEvents.map(each=>{
            if(each.title === action.data.title){
                return action.data;
            }
            else {
                return each;
            }
        });
        const newState = Object.assign({}, state, {
            loading : false,
            error : null,
            allOfTheEvents : [...updatedArray]
        });;
        return newState;
    }
    else if (action.type === 'REMOVE_EVENT_SUCCESS'){
        return Object.assign({}, state, {
            loading : false,
            error : null,
            allOfTheEvents : [...action.data]
        })
    }
    else if (action.type === 'EVENTS_LOGOUT'){
        return Object.assign({}, state, {
            loading : false,
            error : null,
            allOfTheEvents : [{
                patientId: null,
                medId : null,
                title : null,
                start: null,
                end: null,
                userId : null
            }],
            currentEvent : [{
                patientId: null,
                medId : null,
                title : null,
                start: null,
                end: null,
                userId : null
            }]
        })
    }
    else if (action.type === 'CLEAR_CURRENT_EVENT'){
        return Object.assign({}, state, {
            loading: false,
            error: null,
            currentEvent : [{
                patientId: null,
                medId : null,
                title : null,
                start: null,
                end: null,
                userId : null
            }]
        })
    }
    return state;
}
