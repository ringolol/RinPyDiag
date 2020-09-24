import axios from 'axios';
import { errorsLog } from '../utils/logs/errorsLog';
// config API
const baseURL = 'https://31.134.153.18/'; // http://127.0.0.1:8000/ |  https://31.134.153.18/

// axios.defaults.xsrfHeaderName = "X-CSRFToken";  // delete this ?
// axios.defaults.xsrfCookieName = "csrftoken";  // delete this ?

const instance = axios.create({ 
    baseURL: baseURL,
    withCredentials: true,
    // xsrfCookieName: 'csrftoken',  // delete this ?
    // xsrfHeaderName: 'X-CSRFToken',  // delete this ?
    timeout: 10000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

// API
type AuthMeType = {
    id: number
    username: string
    first_name: string
    last_name: string
    email: string
}
type LoginType = {
    detail: string
}
type LogoutType = LoginType;
type RegisterType = {
    detail: string
}
export const authAPI = {
    authMe() {
        return instance.get<AuthMeType>('/api/v1/accounts/profile/', {})
        .then(response => {
            console.log(response);
            return response 
        }).catch(error => {
            console.log(error)
            return null
        })
    },
    login(username: string, password: string) {
        return instance.post<LoginType>('/api/v1/accounts/login/', {
            login: username,
            password: password,
        }, {}).catch(error => {
            console.log(error)
        })
    },
    logout() {
        return instance.post<LogoutType>('/api/v1/accounts/logout/', {
            revoke_token: true,
        }, {}).catch(error => {
            console.log(error)
        })
    },
    register(
        username: string, 
        password: string, 
        password_confirm: string, 
        first_name = "" as string, 
        last_name = "" as string, 
        email = "" as string) {
        return instance.post<RegisterType>('/api/v1/accounts/register/', {
            username,
            first_name,
            last_name,
            email,
            password,
            password_confirm,
        }, {})
        .then(response => {
            console.log(response);
            return response })
        .catch(error => {
            console.log(error)
        })
    }
};

export const diagramAPI = {
    sendFile(user: string | null, name: string, ser: string) {
        return instance.post('/diagram/api/files/', {
            user, name, ser
        }, {})
        .catch(error => errorsLog(error));
    },
    getFiles() {
        return instance.get('/diagram/api/files/', {})
        .catch(error => errorsLog(error));
    },
    getBlocks() {
        return instance.get('/diagram/api/blocks/', {})
        .catch(error => errorsLog(error));
    }
}