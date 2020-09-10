import { getToken, getUsername } from './auth_selectors';
import { blocksAPI, filesAPI, sendFileAPI } from "../api/api";
import { BloksType, FilesType } from "../types/types";

const GET_BLOCKS = 'blocks/GET_BLOCKS';
const GET_FILES = 'blocks/GET_FILES';
const SET_FILE = 'blocks/SET_FILE';
const IS_LOADED = 'blocks/IS_LOADED';
const SET_FILE_NAME = 'blocks/SET_TEXT';


let initialState = {
    blocks: [] as Array<BloksType>,
    files: [] as Array<FilesType>,
    isLoaded: false as boolean,
    filename: '' as string
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



export const downloadContent = (token: string | null) => (dispatch: any) => {
    const blocks = blocksAPI.getBlocks(token);
    const files = filesAPI.getFiles(token);

    Promise.all([blocks, files]).then(resolve => {
        const [blocks, files] = resolve;
        if(blocks.status === 200 && files.status === 200) {
            dispatch(setBlocks(blocks.data));
            dispatch(setFiles(files.data));
            dispatch(setIsLoaded(true));
        } else {
            console.warn()
        } 
    })
}

export const sendFile = (filename: string, ser: string) => async (dispatch: any, getState: any) => {
    const state = getState();
    const token = getToken(state);
    const username = getUsername(state);
    const response = await sendFileAPI.sendFile(token, username, filename, ser);
    if (response && response.status === 201) {
        dispatch(setFile(response.data));
    }
}




export default blocksReducer;