function setAuthHeader(token) {
    if (token) {
        return {
            'authorization': `Token ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
    }
    return {
        'Content-Type': 'application/json',
    }
}

export default setAuthHeader;