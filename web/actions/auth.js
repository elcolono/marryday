// import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';
import { api } from '../lib/api'

export const signin = (email, password) => {
    removeCookie('token');
    removeLocalStorage('user');
    return api.post('/rest-auth/login/', { email, password })
        .then(response => {
            return response;
        })
        .catch(e => e.response);
};

export const signout = next => {
    removeCookie('token');
    removeLocalStorage('user');
    api.post('/rest-auth/logout/')
        .then(response => {
            next();
        })
        .catch(e => console.log(err));
};

// set cookie
export const setCookie = (key, value) => {
    if (process.browser) {
        cookie.set(key, value, {
            expires: 1
        });
    }
};

export const removeCookie = key => {
    if (process.browser) {
        cookie.remove(key, {
            expires: 1
        });
    }
};
// get cookie
export const getCookie = key => {
    if (process.browser) {
        return cookie.get(key);
    }
};
// localstorage
export const setLocalStorage = (key, value) => {
    if (process.browser) {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export const removeLocalStorage = key => {
    if (process.browser) {
        localStorage.removeItem(key);
    }
};
// autheticate user by pass data to cookie and localstorage
export const authenticate = (data, next) => {
    setCookie('token', data.key);
    setLocalStorage('user', data.user);
    next();
};

export const clientAuth = () => {
    // return false
    const cookieChecked = getCookie('token');
    if (cookieChecked) {
        if (localStorage.getItem('user')) {
            return JSON.parse(localStorage.getItem('user'));
        } else {
            return false;
        }
    }
};