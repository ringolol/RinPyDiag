import * as axios from 'axios';

const instance = axios.create({  // не забудь поменять и снизу
    // withCredentials: true,
    baseURL: 'http://31.134.153.18/',  
    // baseURL: 'http://127.0.0.1:8000/',
});
const baseURL = 'http://31.134.153.18/';
// const baseURL = 'http://127.0.0.1:8000/';


// http POST http://31.134.153.18/api-token-auth/ username="admin" password="12344321aA"
// http http://127.0.0.1:8000/diagram/api/files/ "Authorization: Token daa965d9ca1b219509903733b6af8ee4d5f97d33"
// http --json POST http://127.0.0.1:8000/diagram/api/files/ 
//      "Authorization: Token 91196468bb41ed23779bbc6ddd33de9ed07ffd56" 
//      name="test" user="http://127.0.0.1:8000/api/users/3/" ser="{}"

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
                return res.data.token;
            }).catch(function (error) {
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                return null
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

    logout () { localStorage.removeItem('REACT_TOKEN_AUTH') }
};

export const sendFileAPI = {
    sendFile(token, json) {
        return instance.post('/diagram/api/files/', json, {
            // токен из куков
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            }
        }).catch(function (error) {
            if (error.response) {
                // Request made and server responded
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            return null
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
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                return null
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
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                return null
            });
            return response;
        } catch (error) {
            console.error(error);
        }
    }
}