async function fetchGooglePlacesAPI(url, searchParams = []) {
    const newUrl = new URL('https://maps.googleapis.com/maps/api' + url)
    searchParams.forEach(param => newUrl.searchParams.append(param.key, param.value))
    newUrl.searchParams.append("key", "AIzaSyBmWeP4Qc9OTKNHCYbeVtjAhBULx8xsNiQ")
    const res = await fetch(newUrl.href, {
        mode: 'cors'
    });

    const json = res.json()
    if (!res.ok) {
        throw json
    }
    return json
}

export default fetchGooglePlacesAPI;