import getCookieFromReq from '../utils/cookieFromReq';
import Cookies from 'js-cookie';

function setAuthHeader(req = undefined) {

    const token = req ? getCookieFromReq(req) : Cookies.get('token');
    if (token) {
        return {
            'authorization': `Token ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
    }
    return undefined
}

export default setAuthHeader;