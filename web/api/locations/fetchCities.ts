import fetchAPI from '../../utils/fetchAPI';

export default function fetchCities() {
    return fetchAPI('/api/v1/products/cities/');
}
