import fetchAPI from "../../utils/fetchAPI";
import getToken from "../../utils/getToken";

export default function updateProduct(product) {
    const token = getToken()
    return fetchAPI(
        `/api/v1/products/${product.id}/`,
        {
            method: 'DELETE',
            token: token
        }
    )
}