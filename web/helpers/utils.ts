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


export function makeJSDateObject(date: Date ) {

    if (date instanceof Date) {
      return new Date(date.getTime());
    }
  
    return date as any; // handle case with invalid input
  }