// const API_URL = process.env.BASE_URL || 'http://127.0.0.1:8000'
// const API_TOKEN = process.env.DATOCMS_API_TOKEN
import Axios from 'axios';
import { API_URL, API_SERVER_URL } from './constants'

export const api = Axios.create({
    baseURL: process.env.CLIENT_API_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

export async function fetchAPI(url, { method, body } = {}) {
    const res = await fetch(process.env.CLIENT_API_URL + url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${API_TOKEN}`,
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

export async function fetchAPIwithSSR(url, { method } = {}) {
    const res = await fetch(API_URL + url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${API_TOKEN}`,
        },
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