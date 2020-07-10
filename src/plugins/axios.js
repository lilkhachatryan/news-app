import axios from 'axios'

export const CancelToken = axios.CancelToken;
export const isCancel = axios.isCancel;

const http = axios.create({
    baseURL: process.env.REACT_APP_NEWS_API_URL,
    headers: {
        Accept: 'application/json',
        'X-Api-Key': process.env.REACT_APP_NEWS_API_KEY
    }
});

http.interceptors.response.use(res => res, e => {
    // if(!e.response || !e.response.status)
    //     return Promise.reject(e);

    return Promise.reject(e)
});

export default http;
