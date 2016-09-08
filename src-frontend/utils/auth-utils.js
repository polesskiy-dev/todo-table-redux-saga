/** get token from storage */
export const getAuthToken = () => window.localStorage.getItem('token') || window.sessionStorage.getItem('token');

/** check that auth token exists*/
export const authTokenExists = () => !!getAuthToken();

/** remove token from storages */
export const removeAuthToken = () => {
    window.localStorage.removeItem('token');
    window.sessionStorage.removeItem('token');
};

/**
 * Save token to storage depending on remember me flag
 * @param token
 * @param rememberMeFlag
 */
export const saveAuthToken = (token, rememberMeFlag) => {
    const storage = rememberMeFlag ? window.localStorage : window.sessionStorage;
    storage.setItem('token', token)
};