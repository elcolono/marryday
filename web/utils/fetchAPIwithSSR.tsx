import { API_URL } from '../lib/constants';

async function fetchAPIwithSSR(url, { method = 'GET', req = undefined } = {}) {
    try {
        const res = await fetch(API_URL + url, {
            method: method,
            // headers: setAuthHeader(req)
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
    } catch (error) {
        return null;
        // throw error;
    }

}

export default fetchAPIwithSSR;