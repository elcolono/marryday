// https://medium.com/frontend-digest/environment-variables-in-next-js-9a272f0bf655
// Bundle env variables
// NO SECRETS OR API KEYS HERE
module.exports = {
    env: {
        CLIENT_API_URL: process.env.BASE_SERVER_URL || 'http://127.0.0.1:8000',
    },
}