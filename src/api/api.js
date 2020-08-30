import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'http://31.134.153.18/',
    // baseURL: 'http://127.0.0.1:8000/',
});

// http POST http://31.134.153.18/api-token-auth/ username="admin" password="12344321aA"
// http http://127.0.0.1:8000/diagram/api/files/ "Authorization: Token daa965d9ca1b219509903733b6af8ee4d5f97d33"
// http --json POST http://127.0.0.1:8000/diagram/api/files/ 
//      "Authorization: Token 91196468bb41ed23779bbc6ddd33de9ed07ffd56" 
//      name="test" user="http://127.0.0.1:8000/api/users/3/" ser="{}"


// временный токен
let token = 'c4f12a39b92b3a9c1b6c74ac5aadc2c6f1c38c90'; // admin

export const authAPI = {
    async login (login, password) {
        return await instance.post('/api-token-auth/', {
            username: login,
            password: password
        })
        // получаем токен и сохраняем его в куки
        .then(respones => respones.data.token); 
    },

    // logout () { }
};


// токен (авейт вне асинк функции)
(async () => {
    console.log('token: ' + await authAPI.login('admin', '12344321aA'));
})();


export const blocksAPI = {
    getBlocks () {
        return instance.get('/diagram/api/blocks/', {
                // токен берем из куки
                headers: {
                    'Authorization': `Token ${token}` 
            }})
            .then(respones => respones.data);
    }
}

export const filesAPI = {
    getFiles () {
        return instance.get('/diagram/api/files/', {
                // токен берем из куки
                headers: {
                    'Authorization': `Token ${token}` 
            }})
            .then(respones => respones.data)
    }
}

export const sendFileAPI = {
    sendFile() {
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