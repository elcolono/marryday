import fetchAPI from '../utils/fetchAPI';

function fetchCities() {
    return fetchAPI('/api/v1/products/cities/');
}

export default fetchCities;