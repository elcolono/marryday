import fetchAPI from "../../utils/fetchAPI";

export default function addProduct(data = {}) {
    return fetchAPI(`/api/v1/products/`, {method: 'POST', body: data,})
}