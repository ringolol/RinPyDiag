import * as axios from 'axios';


const baseURL = 'http://31.134.153.18/';
// const baseURL = 'http://127.0.0.1:8000/';

const instance = axios.create({ 
    baseURL: baseURL,
});

const errorsLog = (error) => {
    if(error.response) { 
        // Request made and server responded
        console.log(error.response.data, error.response.status, error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
    }
    return null;
}


export const authAPI = {
    async login (username, password) {
        let token = localStorage.getItem('REACT_TOKEN_AUTH') || null;

        // если нет токена, но есть юзернейм и пасс
        // посылаем запрос на логирование
        if (!token && username && password) {
            console.log('get-token')
            return await instance.post('/api-token-auth/', {
                username: username,
                password: password,
            }).then(res => {
                localStorage.setItem('REACT_TOKEN_AUTH', res.data.token);
                localStorage.setItem('REACT_USERNAME', username);
                return res.data.token;
            }).catch(function (error) {
                return errorsLog(error);
            });
        // если есть токен уже есть, то отдаем его
        } else if (token) {
            console.log('return-token')
            return await (async () => {
                return token
            })();
        // иначе ниче не делаем
        } else {
            return;
        }
    },

    logout () { 
        localStorage.removeItem('REACT_TOKEN_AUTH');
        localStorage.removeItem('REACT_USERNAME')
    }
};

export const sendFileAPI = {
    sendFile(token, json) {
        return instance.post('/diagram/api/files/', json, {
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