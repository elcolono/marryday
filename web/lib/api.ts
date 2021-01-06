// const API_URL = process.env.BASE_URL || 'http://127.0.0.1:8000'
// const API_TOKEN = process.env.DATOCMS_API_TOKEN
import Axios from 'axios';
import { API_URL } from './constants'
import Cookies from 'js-cookie'
import { getCookieFromReq } from '../helpers/utils'

const setAuthHeader = (req = undefined) => {
    const token = req ? getCookieFromReq(req) : Cookies.get('token');
    if (token) {
        return {
            'authorization': `Token ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
    }
    return undefined
}

export const api = Axios.create({
    baseURL: `${process.env.CLIENT_API_URL}/api/v1`,
    headers: setAuthHeader()
})

export default class ApiService {
    static saveStripeInfo(data = {}) {
        return api.post(`/payments/save-stripe-info/`, data)
    }

    static makeBooking(data = {}) {
        return api.post(`/cowork/bookings/`, data)
    }

    static fetchLocations() {
        return api.get(`/cowork/locations/`)
    }

    static fetchCities() {
        return api.get('/cowork/cities/')
    }

    static fetchBooking({ bookingId }) {
        return api.get(`/cowork/booking/${bookingId}`)
    }

    static signin = (email, password) => {
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

    static signout = next => {
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
    static authenticate = (data, next) => {
        Cookies.set('token', data.key);
        localStorage.setItem('user', data.user)
        next();
    };
}


export async function fetchAPIwithSSR(url, { method = 'GET', req = undefined } = {}) {
    const res = await fetch(API_URL + url, {
        method: method,
        headers: setAuthHeader(req)
        // body: JSON.stringify({
        //     query,
        //     variables,
        // }),
    })
    const json = await res.json()

    if (json.errors) {
        console.error(json.errors)
        throw new Error('Failed to fetch API')
    }
    return json
}






export async function fetchAPI(url, { method = "GET", body = {} } = {}) {
    const res = await fetch(process.env.CLIENT_API_URL + url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${ API_TOKEN }`,
        },
        body: JSON.stringify({
            ...body,
        }),
    })
    const json = await res.json()

    if (json.errors) {
        console.error(json.errors)
        throw new Error('Failed to fetch API')
    }
    return json
}
