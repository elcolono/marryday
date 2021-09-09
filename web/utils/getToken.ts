import Cookies from 'js-cookie';
import getCookieFromReq from './cookieFromReq';

function getToken(req = undefined) {
    const token = req ? getCookieFromReq(req) : Cookies.get('token');
    if (token) return token;
    return undefined;
}

export default getToken;