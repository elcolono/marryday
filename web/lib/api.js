// const API_URL = process.env.BASE_URL || 'http://127.0.0.1:8000'
// const API_TOKEN = process.env.DATOCMS_API_TOKEN

import { API_URL } from './constants'

export async function fetchAPI(url, { method } = {}) {
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