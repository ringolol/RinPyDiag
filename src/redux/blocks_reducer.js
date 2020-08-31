import { blocksAPI, filesAPI, authAPI } from "../api/api";

const GET_BLOCKS = 'blocks/GET_BLOCKS';
const GET_FILES = 'blocks/GET_FILES';
const IS_LOADED = 'blocks/IS_LOADED';
const SET_TEXT = 'blocks/SET_TEXT';
const SET_USERNAME = 'blocks/SET_USERNAME';
const SET_PASSWORD = 'blocks/SET_PASSWORD';
const LOG_IN = 'blocks/LOG_IN';

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
        case LOG_IN: {
            return {
                ...state,
            }
        }
        default:
            return state;
    }  
}

export const setBlocks = (blocks) => ({ type: GET_BLOCKS, blocks });
export const setFiles = (files) => ({ type: GET_FILES, files });
export const setIsLoaded = (isLoaded) => ({ type: IS_LOADED, isLoaded });
export const setText = (text) => ({ type: SET_TEXT, text });
export const setUserName = (username) => ({ type: SET_USERNAME, username });
export const setPassword = (password) => ({ type: SET_PASSWORD, password });
// export const onLogIn = () => ({type: LOG_IN});


export const onLogIn = (username, password) =>  (dispatch) => {
    authAPI.login(username, password).then(token => {
        console.log(token);
        const blocks = blocksAPI.getBlocks(token);
        const files = filesAPI.getFiles(token);

        Promise.all([blocks, files])
        .then((resolve) => {
            dispatch(setBlocks(resolve[0]));
            dispatch(setFiles(resolve[1]));
            dispatch(setIsLoaded(true));
        })
    })
}

export const getBlocksData = () =>  (dispatch) => {
    dispatch(setIsLoaded(true));
    // ет хня из пропсов должна идти
    
}

export const sendTextForServer = (text) =>  (dispatch) => {

    const asynchrone = new Promise((resolve, reject) => {
        setTimeout(() =>{
            console.log(`Send to server: ${text}`);
            resolve(true)
        }, 1000)
    })

    asynchrone.then(() => {
        alert(text);
    })
      
}



export default blocksReducer;