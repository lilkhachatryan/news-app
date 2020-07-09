import axios from "../plugins/axios";

export const getSourcesFetch = (params) => fetch(`https://newsapi.org/v2/sources?apiKey=99416760de1f41a087206b4225ac3e81&pageSize=3&page=1`, {
    headers: {
        Accept: 'application/json',
    },
}).then((response) => response.json());

export const getSources = (params) => { return axios.get('sources', { params }) };
export const getTops = (params) => { return axios.get('top-headlines', { params }) };
export const getEverything = (params) => { return axios.get('everything', { params }) };
