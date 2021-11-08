import {API_BASE_URL_ROMICO, ACCESS_TOKEN_ROMICO} from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if(localStorage.getItem(ACCESS_TOKEN_ROMICO)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_ROMICO))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if(!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};

export function loginRestAPI(loginRequest) {
    return request({
        url: API_BASE_URL_ROMICO + "/auth/LogIn",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function qbarRestAPI() {
    return request({
        url: API_BASE_URL_ROMICO + "/QBar",
        method: 'GET',
    });
}

export function getCurrentUserRestAPI(user) {
    if(!localStorage.getItem(ACCESS_TOKEN_ROMICO)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL_ROMICO + "/users/"+user,
        method: 'GET'
    });
}