import * as axios from 'axios';
import { register } from '../serviceWorker';
import { errorsLog } from '../utils/logs/errorsLog';

const baseURL = 'https://31.134.153.18/';
// const baseURL = 'http://127.0.0.1:8000/';

// axios.defaults.xsrfHeaderName = "X-CSRFToken";
// axios.defaults.xsrfCookieName = "csrftoken";

const instance = axios.create({ 
    baseURL: baseURL,
    withCredentials: true,
    // xsrfCookieName: 'csrftoken',
    // xsrfHeaderName: 'X-CSRFToken',
    timeout: 10000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

// API
export const authAPI = {
    authMe() {
        return instance.get('/api/v1/accounts/profile/', {})
        .then(response => {
            console.log(response);
            return response })
        .catch(error => {
            console.log(error)
            return null
        })
    },
    login(username, password) {
        return instance.post('/api/v1/accounts/login/', {
            login: username,
            password: password,
        }, {})
        .then(response => {
            console.log(response);
            return response })
        .catch(error => {
            console.log(error)
        })
    },
    logout() {
        return instance.post('/api/v1/accounts/logout/', {
            revoke_token: true,
        }, {})
        .then(response => {
            console.log(response);
            return response })
        .catch(error => {
            console.log(error)
        })
    },
    register(username, password, password_confirm, first_name="", last_name="", email="") {
        return instance.post('/api/v1/accounts/register/', {
            username,
            first_name,
            last_name,
            email,
            password,
            password_confirm,
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
        return instance.get('/diagram/api/files/', {})
        .catch(error => errorsLog(error));
    },
    getBlocks() {
        return instance.get('/diagram/api/blocks/', {})
        .catch(error => errorsLog(error));
    }
}