import { blocksAPI, filesAPI, authAPI, sendFileAPI } from "../api/api";

const GET_BLOCKS = 'blocks/GET_BLOCKS';
const GET_FILES = 'blocks/GET_FILES';
const SET_FILE = 'blocks/SET_FILE';
const IS_LOADED = 'blocks/IS_LOADED';
const SET_TEXT = 'blocks/SET_TEXT';
const SET_USERNAME = 'blocks/SET_USERNAME';
const SET_PASSWORD = 'blocks/SET_PASSWORD';

let initialState = {
    blocks: [],
    files: [],
    isLoaded: false,
    text: ''
};

const blocksReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_BLOCKS: {
            return {
                ...state,
                blocks: [...action.blocks],
            }
        }
        case GET_FILES: {
            return {
                ...state,
                files: [...action.files],
            }
        }
        case SET_FILE: {
            return {
                ...state,
                files: [...state.files, action.file],
            }
        }
        case IS_LOADED: {
            return {
                ...state,
                isLoaded: action.isLoaded,
            }
        }
        case SET_TEXT: {
            return {
                ...state,
                text: action.text,
            }
        }
        case SET_USERNAME: {
            return {
                ...state,
                username: action.username,
            }
        }
        case SET_PASSWORD: {
            return {
                ...state,
                password: action.password,
            }
        }
        default:
            return state;
    }  
}

export const setBlocks = (blocks) => ({ type: GET_BLOCKS, blocks });
export const setFiles = (files) => ({ type: GET_FILES, files });
export const setFile = (file) => ({ type: SET_FILE, file });
export const setIsLoaded = (isLoaded) => ({ type: IS_LOADED, isLoaded });
export const setText = (text) => ({ type: SET_TEXT, text });
export const setUserName = (username) => ({ type: SET_USERNAME, username });
export const setPassword = (password) => ({ type: SET_PASSWORD, password });

export const onLogIn = (username, password) =>  (dispatch) => {
    // отрисовываем логин форму и тп
    dispatch(setIsLoaded(true));

    // логин по имени пользователя и паролю
    authAPI.login(username, password).then(token => {
        console.log(token);
        loadContent(token, dispatch);
    })
}

const loadContent = (token, dispatch) => {
    if(!token) {
        return;
    }
    
    const blocks = blocksAPI.getBlocks(token);
    const files = filesAPI.getFiles(token);

    Promise.all([blocks, files])
    .then(resolve => {
        dispatch(setBlocks(resolve[0]));
        dispatch(setFiles(resolve[1]));
        dispatch(setIsLoaded(true));
    })
}

export const sendFile = (filename, ser) =>  (dispatch) => {
    let token = localStorage.getItem('REACT_TOKEN_AUTH') || null;
    let json = {
        user: "admin",
        name: filename,
        ser: ser
    }
    sendFileAPI.sendFile(token, json).then(response => {
        console.log(response.data);
        if (response.status === 201) {
            dispatch(setFile(response.data));
        }
    });
}



export default blocksReducer;