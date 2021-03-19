import setAuthHeader from './setAuthHeader';

async function fetchAPI(url, { method = "GET", body = undefined, token = undefined } = {}) {
    const headers = setAuthHeader(token);
    const res = await fetch(process.env.CLIENT_API_URL + url, {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
    })

    const json = await res.json()
    if (!res.ok) {
        throw json;
    }
    return json
}

export default fetchAPI;