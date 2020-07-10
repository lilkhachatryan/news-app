import http, { CancelToken }from "../plugins/axios";

let searchRequest;

export const getSources = (params) => { return http.get('sources', { params }) };
export const getTops = (params) => { return http.get('top-headlines', { params }) };

export const getEverything = (params) => {
    if (searchRequest) {
        searchRequest.cancel('One request at a time. Whilst user is typing')
    }
    searchRequest = CancelToken.source();
    return http.get('everything', { params, cancelToken: searchRequest.token })
};
