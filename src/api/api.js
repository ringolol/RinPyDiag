import * as axios from 'axios';
import { errorsLog } from '../utils/logs/errorsLog';
// config API
const TOKEN_AUTH = 'REACT_TOKEN_AUTH';
const USERNAME = 'REACT_USERNAME';

// const baseURL = 'http://31.134.153.18/';
const baseURL = 'http://31.134.153.18:8000/';
// const baseURL = 'http://127.0.0.1:8000/';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const instance = axios.create({ 
    baseURL: baseURL,
    withCredentials: true,
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFTOKEN',
    timeout: 10000,
    // transformRequest: [(data) => JSON.stringify(data.data)],
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

// API
export const authAPI = {
    authMe() {
        return localStorage.getItem(USERNAME);
    },
    login(username, password) {
        return instance.post('/api/v1/accounts/login/', {
            login: username,
            password: password,
        }, {})
        .then(response => {
            console.log(response);
            localStorage.setItem(USERNAME, username);
            return response })
        .catch(error => {
            console.log(error)
        })
    },
    logout () { 
        localStorage.removeItem(USERNAME);
        return instance.post('/api/v1/accounts/logout/', {
            revoke_token: true
        }, {})
        .then(response => {
            console.log(response);
            return response })
        .catch(error => {
            console.log(error)
        })
    }
};

export const diagramAPI = {
    sendFile(user, name, ser) {
        return instance.post('/diagram/api/files/', {
            user, name, ser
        }, {})
        .catch(error => errorsLog(error));
    },
    getFiles() {
        return instance.get('diagram/api/files/', {})
        .catch(error => errorsLog(error));
    },
    getBlocks() {
        return instance.get('diagram/api/blocks/', {})
        .catch(error => errorsLog(error));
    }
}