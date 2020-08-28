import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://31.134.153.18/'
});

export const blocksAPI = {
    getBlocks () {
        return instance.get('diagram/api/blocks/?format=json');
    }
}