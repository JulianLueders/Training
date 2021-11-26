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

export function getAllPolls(page, size) {
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/polls?page=" + page + "&size=" + size,
        method: 'GET'
    });
}

export function createPoll(pollData) {
    return request({
        url: API_BASE_URL + "/polls",
        method: 'POST',
        body: JSON.stringify(pollData)
    });
}

export function castVote(voteData) {
    return request({
        url: API_BASE_URL + "/polls/" + voteData.pollId + "/votes",
        method: 'POST',
        body: JSON.stringify(voteData)
    });
}

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

export function addMessage(msg) {
    return request({
        url: API_BASE_URL + "/messages/add?msg="+msg,
        method: 'POST',
    });
}

export function deleteMessage(msg) {
    return request({
        url: API_BASE_URL + "/messages/delete?msg="+msg,
        method: 'DELETE',
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function monthOverview() {
    return request({
        url: API_BASE_URL + "/tabelle/all/monthlyview",
        method: 'GET'
    });
}

export function getProtocolWithLimit(){
    return request({
        url: API_BASE_URL + "/tabelle/allcallslimit?limit=20",
        method: 'GET'
    });
}

export function dayOverview() {
    return request({
        url: API_BASE_URL + "/data/dayview",
        method: 'GET'
    });
}

export function allDaily() {
    return request({
        url: API_BASE_URL + "/tabelle/all/daily",
        method: 'GET'
    });
}

export function testUrl2() {
    return request({
        url: API_BASE_URL + "/tabelle/groups/recent?month=9&year=2020",
        method: 'GET'
    });
}

export function groupsLastYear() {
    return request({
        url: API_BASE_URL + "/tabelle/groups/lastyear",
        method: 'GET'
    });
}

export function getWallboard() {
    return request({
        url: API_BASE_URL + "/wallboard/getConfig",
        method: 'GET'
    });
}

export function getUserGroups() {
    return request({
        url: API_BASE_URL + "/tabelle/groups/all",
        method: 'GET'
    });
}

export function testUrl3() {
    return request({
        url: API_BASE_URL + "/tabelle/groups/datatable",
        method: 'GET'
    });
}

export function testUrl4() {
    return request({
        url: API_BASE_URL + "/tabelle/all/hoursofday",
        method: 'GET'
    });
}

export function testUrl5() {
    return request({
        url: API_BASE_URL + "/tabelle/groups/trend",
        method: 'GET'
    });
}

export function testUrl6() {
    return request({
        url: API_BASE_URL + "/tabelle/todayanalysis",
        method: 'GET'
    });
}

export function hourly() {
    return request({
        url: API_BASE_URL + "/tabelle/all/hoursofday",
        method: 'GET'
    });
}

export function setAnalyticsTime(msg){
    return request({
        url: API_BASE_URL + "/config/update?id=analytics_time&value="+msg,
        method: 'POST',
    });
}
export function getConfigValue(id){
    return request({
        url: API_BASE_URL + "/config/getConfig?id="+id,
        method: 'GET',
    });
}
export function setConfigValue(id, msg){
    return request({
        url: API_BASE_URL + "/config/insert?id="+id+"&value="+msg,
        method: 'POST',
    });
}

export function getGroupsAnalyticsLive(msg){
    return request({
        url: API_BASE_URL + "/tabelle/live/groups",
        method: 'GET',
    });
}


export function setAnalyticsMonthOrDay(msg){
    return request({
        url: API_BASE_URL + "/config/update?id=month&value="+msg,
        method: 'POST',
    });
}

export function setAcdConfig(msg){
    return request({
        url: API_BASE_URL + "/config/update?id=acd&value="+msg,
        method: 'POST',
    });
}

export function addWallboardConfig(name){
    return request({
        url: API_BASE_URL + "/wallboard/addConfig?name="+name,
        method: 'POST',
    });
}

export function setWallboardConfig2(msg){
    return request({
        url: API_BASE_URL + "/config/wallboard",
        method: 'POST',
        body: JSON.stringify(msg)
    });
}

export function setWallboardConfig(msg){
    return request({
        url: API_BASE_URL + "/config/update?id=wallboard&value="+msg,
        method: 'POST',
    });
}

export function getWallboardConfig(msg){
    return request({
        url: API_BASE_URL + "/config/getConfig?id=wallboard",
        method: 'GET',
    });
}

export function getHeadData(id){
    if(id != null){
        return request({
            url: API_BASE_URL + "/tabelle/analytics/headdata?id="+id,
            method: 'GET'
        });
    }
    return request({
        url: API_BASE_URL + "/tabelle/analytics/headdata",
        method: 'GET'
    });
}


export function weekday() {
    return request({
        url: API_BASE_URL + "/tabelle/all/weekday",
        method: 'GET'
    });
}

export function getAnalytics() {
    return request({
        url: API_BASE_URL + "/tabelle/analytics/year",
        method: 'GET'
    });
}

export function getLineAnalyticsToday() {
    return request({
        url: API_BASE_URL + "/tabelle/lines/today",
        method: 'GET'
    });
}

export function getLineTalktimeToday() {
    return request({
        url: API_BASE_URL + "/tabelle/lines/talktime",
        method: 'GET'
    });
}

export function getGroupTalktimeToday() {
    return request({
        url: API_BASE_URL + "/tabelle/groups/talktime",
        method: 'GET'
    });
}

export function getLiveMessages() {
    return request({
        url: API_BASE_URL + "/messages/get",
        method: 'GET'
    });
}

export function getAnalyticsToday(id) {
    if(id != null){
        return request({
            url: API_BASE_URL + "/tabelle/analytics/day?id="+id,
            method: 'GET'
        });
    }
    return request({
        url: API_BASE_URL + "/tabelle/analytics/day",
        method: 'GET'
    });
}

export function getWQRecent(id) {
    if(id != null){
        return request({
            url: API_BASE_URL + "/tabelle/wq/recent?group="+id,
            method: 'GET'
        });
    }
    return request({
        url: API_BASE_URL + "/tabelle/wq/recent",
        method: 'GET'
    });
}

export function getWQFuture(id) {
    if(id != null){
        return request({
            url: API_BASE_URL + "/tabelle/wq/future?group="+id,
            method: 'GET'
        });
    }
    return request({
        url: API_BASE_URL + "/tabelle/wq/future",
        method: 'GET'
    });
}

export function groupByMonth() {
    return request({
        url: API_BASE_URL + "/tabelle/all/monthly",
        method: 'GET'
    });
}


export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
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