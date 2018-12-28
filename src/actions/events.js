import {API_BASE_URL} from '../config';

export const everyEventsRequest = () => ({
    type : 'EVERY_EVENTS_REQUEST'
});
export const everyEventsError = error => ({
    type : 'EVERY_EVENTS_ERROR',
    error
});
export const eventsLogout = () =>({
    type : 'EVENTS_LOGOUT'
});
// the successes
export const fetchOneEventSuccess = data => ({
    type : 'FETCH_ONE_EVENT_SUCCESS',
    data
});
export const fetchAllEventsSuccess = data => ({
    type : 'FETCH_ALL_EVENTS_SUCCESS',
    data
});
export const createNewEventSuccess = data => ({
    type : 'ADD_EVENT_SUCCESS',
    data
});
export const updateEventSuccess = data => ({
    type : 'UPDATE_EVENT_SUCCESS',
    data
});
export const removeEventSuccess = data => ({
    type : 'REMOVE_EVENT_SUCCESS',
    data
});
// the async actions
export const fetchOneEvent = user => dispatch =>{
    dispatch(everyEventsRequest());
    return fetch(`${API_BASE_URL}/api/events/${user.id.toString()}`, {
        method: 'GET',
        headers : {
            'content-type': 'application/json',
            'Authorization' : `Bearer ${user.token}`
        }
    })
    .then(badData=> badData.json())
    .then(data => {
        return dispatch(fetchOneEventSuccess(data))
    })
    .catch(err=> dispatch(everyEventsError(err)));
};
export const fetchAllEvents = user => dispatch =>{
    dispatch(everyEventsRequest());
    return fetch(`${API_BASE_URL}/api/events`, {
        method: 'GET',
        headers : {
            'content-type': 'application/json',
            'Authorization' : `Bearer ${user.token}`
        }
    })
    .then(badData=> badData.json())
    .then(data => {
        return dispatch(fetchAllEventsSuccess(data))
    })
    .catch(err=> dispatch(everyEventsError(err)));
};
export const createNewEvent = user => dispatch=> {
    dispatch(everyEventsRequest());
    return fetch(`${API_BASE_URL}/api/events`, {
        method : 'POST',
        headers : {
            'content-type': 'application/json',
            'Authorization' : `Bearer ${user.token}`
        },
        body: JSON.stringify(user) 
    })
    .then(unJsonifiedData => unJsonifiedData.json())
    .then(data => {
        return dispatch(createNewEventSuccess(data));
    })
    .catch(err=> {
        return dispatch(everyEventsError(err));
    });
};
export const updateEvent = user => dispatch =>{
    dispatch(everyEventsRequest());
    return fetch(`${API_BASE_URL}/api/events/${user.eventId}`, {
        method: 'PUT',
        headers : {
            'content-type': 'application/json',
            'Authorization' : `Bearer ${user.token}`
        },
        body: JSON.stringify(user) 
    })
    .then(unJsonifiedData => unJsonifiedData.json())
    .then(data => {
        return dispatch(updateEventSuccess(data));
    })
    .catch(err=> {
        return dispatch(everyEventsError(err));
    });
};
export const removeEvent = user => dispatch =>{
    dispatch(everyEventsRequest());
    return fetch(`${API_BASE_URL}/api/events/${user.eventId}`, {
        method: 'DELETE',
        headers : {
            'content-type': 'application/json',
            'Authorization' : `Bearer ${user.token}`
        }
    })
    .then(unJsonifiedData => unJsonifiedData.json())
    .then(data => {
        return dispatch(removeEventSuccess(data));
    })
    .catch(err=> {
        return dispatch(everyEventsError(err));
    });
};

