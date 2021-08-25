import setAuthHeader from './setAuthHeader';

async function fetchAPI(url, {
    method = "GET",
    body = undefined,
    isForm = false,
    token = undefined,
    mediaType = undefined
} = {}) {
    const headers = setAuthHeader(token, mediaType);
    const res = await fetch(process.env.CLIENT_API_URL + url, {
        method: method,
        headers: headers,
        body: isForm ? body : JSON.stringify(body),
    })

    const json = await res.json()
    if (!res.ok) {
        throw json;
    }
    return json
}

export default fetchAPI;