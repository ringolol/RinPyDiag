import { blocksAPI, filesAPI, authAPI, sendFileAPI } from "../api/api";
import { BloksType, FilesType } from "../types/types";

const GET_BLOCKS = 'blocks/GET_BLOCKS';
const GET_FILES = 'blocks/GET_FILES';
const SET_FILE = 'blocks/SET_FILE';
const IS_LOADED = 'blocks/IS_LOADED';
const SET_FILE_NAME = 'blocks/SET_TEXT';
const SET_USERNAME = 'blocks/SET_USERNAME';
const SET_PASSWORD = 'blocks/SET_PASSWORD';


let initialState = {
    blocks: [] as Array<BloksType>,
    files: [] as Array<FilesType>,
    isLoaded: false as boolean,
    filename: '' as string,
    username: '' as string,
    password: '' as string
};

export type InitialStateType = typeof initialState;

const blocksReducer = (state = initialState, action: any): InitialStateType => {

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
        case SET_FILE_NAME: {
            return {
                ...state,
                filename: action.filename,
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

type SetBlocksActionType = {
    type: typeof GET_BLOCKS
    blocks: Array<BloksType>
}
export const setBlocks = (blocks: Array<BloksType>): SetBlocksActionType => ({ type: GET_BLOCKS, blocks });
type SetFilesActionType = {
    type: typeof GET_FILES
    files: Array<FilesType>
}
export const setFiles = (files: Array<FilesType>): SetFilesActionType => ({ type: GET_FILES, files });
type SetFileActionType = {
    type: typeof SET_FILE
    file: FilesType
}
export const setFile = (file: FilesType): SetFileActionType => ({ type: SET_FILE, file });
type SetIsLoadedActionType = {
    type: typeof IS_LOADED
    isLoaded: boolean
}
export const setIsLoaded = (isLoaded: boolean): SetIsLoadedActionType => ({ type: IS_LOADED, isLoaded });
export type SetFileNameActionType = {
    type: typeof SET_FILE_NAME
    filename: string
}
export const setFileName = (filename: string): SetFileNameActionType => ({ type: SET_FILE_NAME, filename });
export type SetUserNameActionType = {
    type: typeof SET_USERNAME
    username: string
}
export const setUserName = (username: string): SetUserNameActionType => ({ type: SET_USERNAME, username });
export type SetPasswordActionType = {
    type: typeof SET_PASSWORD
    password: string
}
export const setPassword = (password: string): SetPasswordActionType => ({ type: SET_PASSWORD, password });


export const onLogIn = (username: string, password: string) =>  (dispatch: any) => {
    // отрисовываем логин форму и тп
    dispatch(setIsLoaded(true));

    // логин по имени пользователя и паролю
    authAPI.login(username, password).then(token => {
        console.log(token);
        loadContent(token, dispatch);
    })
}

const loadContent = (token: string, dispatch: any) => {
    if(!token) {
        return;
    }
    
    const blocks = blocksAPI.getBlocks(token);
    const files = filesAPI.getFiles(token);

    Promise.all([blocks, files])
    .then(resolve => {
        console.log(resolve);
        if(resolve[0] && resolve[0].status === 200) {
            dispatch(setBlocks(resolve[0].data));
        }
        if(resolve[1] && resolve[1].status === 200) {
            dispatch(setFiles(resolve[1].data));
        }
        dispatch(setIsLoaded(true));
    })
}

export const sendFile = (filename: string, ser: string) => async (dispatch: any) => {
    let token = localStorage.getItem('REACT_TOKEN_AUTH') || null;
    let username = localStorage.getItem('REACT_USERNAME') || null;
    let json = {
        user: username,
        name: filename,
        ser: ser
    }

    const response = await sendFileAPI.sendFile(token, json);
    if (response && response.status === 201) {
        dispatch(setFile(response.data));
    }
}

export const onLogOut = () => (dispatch: any) => {
    authAPI.logout()
    dispatch(setBlocks([]));
    dispatch(setFiles([]));
}



export default blocksReducer;