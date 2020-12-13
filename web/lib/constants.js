// https://medium.com/frontend-digest/environment-variables-in-next-js-9a272f0bf655
// NO SECRETS OR API KEYS HERE
// On the right side define local env values ( because locally we dont use env files )

// TODO DEFINE CORRECT BROWSER VARIABLES

export const CMS_NAME = 'MOWO Spaces'
export const API_URL = process.env.BASE_URL || 'http://127.0.0.1:8000'
export const API_SERVER_URL = process.env.BASE_SERVER_URL || 'https://admin.mowo.space'
