import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'http://31.134.153.18/',
    // withCredentials: true
});

const auth = {
    auth: {
        username: 'kek',
        password: '12344321aA'
    }
}

export const authAPI = {
    login () {
        
    },
    logout () {

    }
}

export const blocksAPI = {
    async getBlocks () {
        try {
            const response = await axios.get('http://31.134.153.18/diagram/api/blocks', auth);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}

export const filesAPI = {
    async getFiles () {
        try {
            const response = await axios.get('http://31.134.153.18/diagram/api/files', auth);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}

