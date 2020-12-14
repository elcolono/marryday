// const API_URL = process.env.BASE_URL || 'http://127.0.0.1:8000'
// const API_TOKEN = process.env.DATOCMS_API_TOKEN
import Axios from 'axios';
import { API_URL } from './constants'
import Cookies from 'js-cookie'
import { getCookieFromReq } from '../helpers/utils'

const setAuthHeader = (req) => {
    const token = req ? getCookieFromReq(req, 'token') : Cookies.getJSON('token');
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


export async function fetchAPIwithSSR(url, { method, req } = {}) {
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









export async function fetchAPI(url, { method, body } = {}) {
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
