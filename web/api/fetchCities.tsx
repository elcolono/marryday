import fetchAPI from '../utils/fetchAPI';

function fetchCities() {
    return fetchAPI('/api/v1/cowork/cities/');
}

export default fetchCities;