import * as axios from 'axios';

const instance = axios.create({
    // withCredentials: true,
    // baseURL: 'http://31.134.153.18/',
    baseURL: 'http://127.0.0.1:8000/',
});


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
            })
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

    // logout () { }
};


export const blocksAPI = {
    getBlocks (token) {
        return  instance.get('/diagram/api/blocks/', {
            headers: {
                'Authorization': `Token ${token}` 
            }
        })
        .then(respones => respones.data);
    }
}

export const filesAPI = {
    getFiles (token) {
        return instance.get('/diagram/api/files/', {
            headers: {
                'Authorization': `Token ${token}` 
            }
        })
        .then(respones => respones.data);
    }
}

export const sendFileAPI = {
    sendFile(token, json) {
        return instance.post('/diagram/api/files/', json, {
            // токен из куков
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(respones =>console.log(respones))
    }
}