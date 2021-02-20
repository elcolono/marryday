import fetchAPI from '../utils/fetchAPI';

function fetchLocations() {
    return fetchAPI('/api/v1/cowork/locations/');
}

export default fetchLocations;