// import fetch from 'isomorphic-fetch';
import Cookies from 'js-cookie';
import { api } from '../lib/api'

export const signin = (email, password) => {
    Cookies.remove('token');
    localStorage.removeItem('user');
    return api.post('/rest-auth/login/', { email, password })
        .then(response => {
            return response;
        })
        .catch((e) => {
            Cookies.remove('token');
            localStorage.removeItem('user');
            return e.response
        });
};

export const signout = next => {
    Cookies.remove('token');
    localStorage.removeItem('user');
    api.delete;
    api.post('/rest-auth/logout/')
        .then(response => {
            next();
        })
        .catch(e => console.log(e.response));
};

// autheticate user by pass data to cookie and localstorage
export const authenticate = (data, next) => {
    Cookies.set('token', data.key);
    localStorage.setItem('user', data.user)
    next();
};