import setAuthHeader from './setAuthHeader';

async function fetchAPI(url, {
    method = "GET",
    body = undefined,
    isForm = false,
    token = undefined,
    mediaType = undefined,
    searchParams = []
} = {}) {
    const headers = setAuthHeader(token, mediaType);
    const requestUrl = new URL(process.env.CLIENT_API_URL + url)
    searchParams.forEach(param => requestUrl.searchParams.append(param.key, param.value))
    const res = await fetch(requestUrl.href, {
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