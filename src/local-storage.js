export const saveAuthToken = authToken => {
    try {
        localStorage.setItem('authToken', authToken);
    }
    catch(err){
    }
};
export const loadAuthToken = () => {
    return localStorage.getItem('authToken');
};
export const clearAuthToken = () => {
    try {
        localStorage.removeItem('authToken');
    } catch (e) {}
};
