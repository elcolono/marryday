import fetchAPI from '../../utils/fetchAPI';

export default function fetchLocations() {
    return fetchAPI('/api/v1/products/locations/');
}
