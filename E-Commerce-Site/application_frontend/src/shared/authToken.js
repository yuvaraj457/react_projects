export const setAuthToken = (data) => {
    sessionStorage.setItem('auth-token', data);
}

export const getAuthToken = () => {
    return sessionStorage.getItem('auth-token');
}

export const clearAuthToken = () => {
    sessionStorage.clear();
}