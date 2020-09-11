import * as axios from 'axios';
import { errorsLog } from '../utils/logs/errorsLog';


const baseURL = 'http://31.134.153.18/';
// const baseURL = 'http://127.0.0.1:8000/';

const instance = axios.create({ 
    baseURL: baseURL,
});


export const authAPI = {
    authMe () {
        const token = localStorage.getItem('REACT_TOKEN_AUTH');
        const username = localStorage.getItem('REACT_USERNAME');
        return [token || null, username || null];

    },
    login (username, password) {
        return instance.post('/api-token-auth/', {
            username,
            password,
        }).then((response) => {
            localStorage.setItem('REACT_TOKEN_AUTH', response.data.token);
            localStorage.setItem('REACT_USERNAME', username);
            return response;
        }).catch(error => {
            console.log(error);
        })
    },
    logout () { 
        localStorage.removeItem('REACT_TOKEN_AUTH');
        localStorage.removeItem('REACT_USERNAME')
    }
};

export const sendFileAPI = {
    sendFile(token, user, name, ser) {
        return instance.post('/diagram/api/files/', {
            user, name, ser
        }, {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            }
        }).catch(function (error) {
            return errorsLog(error);
        });
    }
}

export const blocksAPI = {
    async getBlocks (token) {
        try {
            const response = await axios.get(`${baseURL}diagram/api/blocks/`, {
                headers: {
                    'Authorization': `Token ${token}` 
                }
            }).catch(function (error) {
                return errorsLog(error);
            });
            return response
        } catch (error) {
            console.error(error);
        }
    }
}

export const filesAPI = {
    async getFiles (token) {
        try {
            const response = await axios.get(`${baseURL}diagram/api/files/`, {
                headers: {
                    'Authorization': `Token ${token}` 
                }
            }).catch(function (error) {
                return errorsLog(error);
            });
            return response;
        } catch (error) {
            console.error(error);
        }
    }
}