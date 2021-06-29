import fetchAPI from '../utils/fetchAPI';

function fetchLocations() {
    return fetchAPI('/api/v1/products/locations/');
}

function fetchSomething() {
    return fetchAPI('/api/v1')
}

export default fetchLocations;