import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'http://31.134.153.18/',
});

export const blocksAPI = {
    getBlocks () {
        return instance.get('/diagram/api/blocks', {
                auth: {
                    username: 'admin',
                    password: '0192837465aAaAcCcC'
            }})
            .then((val) => { console.log(val); })
    }
}

export const filesAPI = {
    getFiles () {
        return instance.get('/diagram/api/files', {
                auth: {
                    username: 'admin',
                    password: '0192837465aAaAcCcC'
            }})
            .then((val) => { console.log(val); })
    }
}