const axios = require('axios').create({
    baseURL: process.env.REACT_APP_NEWS_API_URL,
    headers: {
        Accept: 'application/json',
        'X-Api-Key': process.env.REACT_APP_NEWS_API_KEY
    }
});

axios.interceptors.response.use(res => res, e => {
    if(!e.response || !e.response.status)
        return Promise.reject(e);

    return Promise.reject(e)
});

export default axios;
