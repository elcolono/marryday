function setAuthHeader(token, mediaType = 'application/json') {
    if (token) {
        return {
            'authorization': `Token ${token}`,
            'Content-Type': mediaType,
        };
    }
    return {
        'Content-Type': mediaType,
    }
}

export default setAuthHeader;