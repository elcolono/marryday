import fetchAPI from "../../utils/fetchAPI";
import getToken from "../../utils/getToken";

export default function retrieveProductImage(image) {
    const token = getToken()
    return fetchAPI(
        `/api/v1/products/image/${image.uuid}`,
        {
            method: 'GET',
            token: token
        }
    )
}