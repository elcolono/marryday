import fetchAPI from '../../utils/fetchAPI';

export default function loginGoogle(code = "") {

    const data = {
        access_token: "",
        code: code,
        id_token: ""
    }

    return fetchAPI(
        `/api/v1/accounts/auth/google/`,
        {method: 'POST', body: data,}
    )
}
