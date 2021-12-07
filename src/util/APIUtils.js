import {API_BASE_URL, POLL_LIST_SIZE, ACCESS_TOKEN} from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
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


export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}


export function changePassword(changePasswordRequest) {
    return request({
        url: API_BASE_URL + "/auth/changepassword",
        method: 'POST',
        body: JSON.stringify(changePasswordRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}


export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

/**export function getCurrentUserRomico() {
    if(!localStorage.getItem(ACCESS_TOKEN_ROMICO)) {
        return Promise.reject("No access token set.");
    }
    return requestRomico({
        url: "https://api-dev.romico.de/api/v1/Romico/users/julian.lueders",
        method: 'GET'
    });
}**/

export function getUserProfile(username) {
    return request({
        url: API_BASE_URL + "/users/" + username,
        method: 'GET'
    });
}

export function getAllQuestions(quiz, mode) {
    return request({
        url: API_BASE_URL + "/questions/receive?mode="+mode+"&quiz=" + quiz,
        method: 'GET'
    });
}

export function setSavedTest(mode, msg, quiz){
    return request({
        url: API_BASE_URL + "/questions/save?delete=false&mode="+mode+"&json="+msg+"&quiz="+quiz,
        method: 'POST',
    });
}

export function setQuestionWrong(question){
    return request({
        url: API_BASE_URL + "/questions/saveQuestion?delete=false&question="+question+"&type=wrong",
        method: 'GET',
    });
}

export function setQuestionRight(question){
    return request({
        url: API_BASE_URL + "/questions/saveQuestion?delete=true&question="+question+"&type=wrong",
        method: 'GET',
    });
}

export function toggleQuestionFlagged(question){
    return request({
        url: API_BASE_URL + "/questions/saveQuestion?delete=false&question="+question+"&type=flag",
        method: 'GET',
    });
}

export function deleteSavedTest(mode, quiz){
    return request({
        url: API_BASE_URL + "/questions/save?delete=true&mode="+mode+"&json=null&quiz="+quiz,
        method: 'POST',
    });
}

export function getSavedTest(mode, quizId){
    return request({
        url: API_BASE_URL + "/questions/savedTest?mode="+mode+"&quiz="+quizId,
        method: 'GET',
    });
}
