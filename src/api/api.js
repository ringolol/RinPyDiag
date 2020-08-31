import * as axios from 'axios';

const instance = axios.create({  // не забудь поменять и снизу
    // withCredentials: true,
    // baseURL: 'http://31.134.153.18/',  
    baseURL: 'http://127.0.0.1:8000/',
});
// const baseURL = 'http://31.134.153.18/';
const baseURL = 'http://127.0.0.1:8000/';

const token = 'c4f12a39b92b3a9c1b6c74ac5aadc2c6f1c38c90';
const headers = {
    headers: {
        'Authorization': `Token ${token}` 
    }
}

// http POST http://31.134.153.18/api-token-auth/ username="admin" password="12344321aA"
// http http://127.0.0.1:8000/diagram/api/files/ "Authorization: Token daa965d9ca1b219509903733b6af8ee4d5f97d33"
// http --json POST http://127.0.0.1:8000/diagram/api/files/ 
//      "Authorization: Token 91196468bb41ed23779bbc6ddd33de9ed07ffd56" 
//      name="test" user="http://127.0.0.1:8000/api/users/3/" ser="{}"


// временный токен
// let token = 'c4f12a39b92b3a9c1b6c74ac5aadc2c6f1c38c90'; // admin

export const authAPI = {
    async login (username, password) {
        console.log(localStorage.getItem('REACT_TOKEN_AUTH'))
        let token = localStorage.getItem('REACT_TOKEN_AUTH') || null;
        console.log('token: ' + token)
        if (!token && username && password) {
            console.log('get-token')
            return await instance.post('/api-token-auth/', {
                username: username,
                password: password,
            }).then(res => {
                localStorage.setItem('REACT_TOKEN_AUTH', res.data.token);
                return res.data.token;
            })
        } else if (token) {
            console.log('return-token')
            return await (async () => {
                return token
            })();
        } else {
            return;
        }
    },

    // logout () { }
};


// токен (авейт вне асинк функции)
// (async () => {
//     console.log('token: ' + await authAPI.login('admin', '12344321aA'));
// })();


export const blocksAPI = {
    async getBlocks () {
        try {
            const response = await axios.get(`${baseURL}diagram/api/blocks/`, headers);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}

export const filesAPI = {
    async getFiles () {
        try {
            const response = await axios.get(`${baseURL}diagram/api/files/`, headers);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}

export const sendFileAPI = {
    sendFile(token) {
        let test_json = {
            user: "admin",
            name: "test-axios",
            ser: {}
        }
        return instance.post('/diagram/api/files/', test_json, {
            // токен из куков
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(respones =>console.log(respones))
    }
}

// посылаем файл на серв
// sendFileAPI.sendFile()