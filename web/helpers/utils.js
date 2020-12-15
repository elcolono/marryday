import Cookies from 'cookies'

export const getCookieFromReq = (req) => {
    // const cookie = req.headers && req.headers.cookie.split(';').find(c => c.trim().startsWith(`${cookieKey}=`));
    // Create a cookies instance
    const cookies = new Cookies(req)
    // Get a cookie
    const cookie = cookies.get('token')
    if (!cookie) { return undefined };

    return cookie
}