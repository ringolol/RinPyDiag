import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'http://31.134.153.18/',
});

export const blocksAPI = {
    getBlocks () {
        return instance.get('/diagram/api/blocks', {
                // эт над будет заменить на куки
                auth: {
                    username: 'kek',
                    password: '12344321aA'
            }})
            .then((val) => { console.log(val); })
    }
}

export const filesAPI = {
    getFiles () {
        return instance.get('/diagram/api/files', {
                // эт над будет заменить на куки
                auth: {
                    username: 'kek',
                    password: '12344321aA'
            }})
            .then((val) => { console.log(val); })
    }
}