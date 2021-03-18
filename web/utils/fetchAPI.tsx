import setAuthHeader from './setAuthHeader';

async function fetchAPI(url, { method = "GET", body = undefined } = {}) {
    const res = await fetch(process.env.CLIENT_API_URL + url, {
        method: method,
        headers: setAuthHeader(),
        body: JSON.stringify(body),
    })
    const json = await res.json()
    if (!res.ok) {
        throw json;
    }
    return json
}

export default fetchAPI;