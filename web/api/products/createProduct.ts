import fetchAPI from "../../utils/fetchAPI";
import getToken from "../../utils/getToken";

export default function createProduct(product = {}) {
    const token = getToken()
    return fetchAPI(
        `/api/v1/products/vendor`,
        {
            method: 'POST',
            body: product,
            token: token
        }
    )
}