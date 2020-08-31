import { blocksAPI, filesAPI, authAPI } from "../api/api";

const GET_BLOCKS = 'blocks/GET_BLOCKS';
const GET_FILES = 'blocks/GET_FILES';
const IS_LOADED = 'blocks/IS_LOADED';
const SET_TEXT = 'blocks/SET_TEXT';

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
        default:
            return state;
    }  
}

export const setBlocks = (blocks) => ({ type: GET_BLOCKS, blocks });
export const setFiles = (files) => ({ type: GET_FILES, files });
export const setIsLoaded = (isLoaded) => ({ type: IS_LOADED, isLoaded });
export const setText = (text) => ({ type: SET_TEXT, text });



export const getBlocksData = () =>  (dispatch) => {
    // ет хня из пропсов должна идти
    let username = 'admin';
    let password = '12344321aA';

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