import * as axios from 'axios';
import { errorsLog } from '../utils/logs/errorsLog';
// config API
const TOKEN_AUTH = 'REACT_TOKEN_AUTH';
const USERNAME = 'REACT_USERNAME';

const baseURL = 'http://31.134.153.18/'; // 'http://127.0.0.1:8000/' || 'http://31.134.153.18/'
const instance = axios.create({ 
    baseURL: baseURL
});
const headers = (token, content) => {
    return {
        'Authorization': `Token ${token}`,
        'Content-Type': content && 'application/json'
    }
}

// API
export const authAPI = {
    authMe () {
        const token = localStorage.getItem(TOKEN_AUTH);
        const username = localStorage.getItem(USERNAME);
        return [token || null, username || null];

    },
    login (username, password) {
        return instance.post('/api-token-auth/', {
            username,
            password,
        }).then((response) => {
            localStorage.setItem(TOKEN_AUTH, response.data.token);
            localStorage.setItem(USERNAME, username);
            return response;
        }).catch(error => {
            console.log(error);
        })
    },
    logout () { 
        localStorage.removeItem(TOKEN_AUTH);
        localStorage.removeItem(USERNAME);
    }
};

export const diagramAPI = {
    sendFile(token, user, name, ser) {
        return instance.post('/diagram/api/files/', {
            user, name, ser
        }, {
            headers: headers(token, true)
        }).catch(error => errorsLog(error));
    },
    getFiles (token) {
        return instance.get('diagram/api/files/', {
            headers: headers(token)
        }).catch(error => errorsLog(error));
    },
    getBlocks (token) {
        return instance.get('diagram/api/blocks/', { 
            headers: headers(token) 
        }).catch(error => errorsLog(error));
    }
}