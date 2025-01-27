import { getUsername } from './auth_selectors';
import { diagramAPI } from "../api/api";
import { BloksType, FilesType } from "../types/types";

const GET_BLOCKS = 'blocks/GET_BLOCKS';
const GET_FILES = 'blocks/GET_FILES';
const SET_FILE = 'blocks/SET_FILE';
const IS_LOADED = 'blocks/IS_LOADED';
const SET_FILE_NAME = 'blocks/SET_TEXT';
const SET_IS_MOUNT = 'blocks/SET_IS_MOUNT';


let initialState = {
    blocks: [] as Array<BloksType>,
    files: [] as Array<FilesType>,
    isLoaded: false as boolean,
    filename: '' as string,
    isMounted: false as boolean
};

export type InitialStateType = typeof initialState;

const diagramReducer = (state = initialState, action: any): InitialStateType => {

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
        case SET_IS_MOUNT: {
            return {
                ...state,
                isMounted: action.isMounted,
            }
        }
        default:
            return state;
    }  
}
// Actions
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
export type SetIsMountActionType = {
    type: typeof SET_IS_MOUNT
    isMounted: boolean
}
export const setIsMount = (isMounted: boolean): SetIsMountActionType => ({ type: SET_IS_MOUNT, isMounted });

// Thunks
export const downloadContent = () => (dispatch: any) => {
    const blocks = diagramAPI.getBlocks();
    const files = diagramAPI.getFiles();

    Promise.all([blocks, files]).then(resolve => {
        const [blocks, files] = resolve;
        if(blocks && blocks.status === 200 && files && files.status === 200) {
            dispatch(setBlocks(blocks.data));
            dispatch(setFiles(files.data));
            dispatch(setIsLoaded(true));
        } else {
            console.error('Some error downloadContent')
        } 
    })
}

export const sendFile = (filename: string, ser: string) => async (dispatch: any, getState: any) => {
    const state = getState();
    const username = getUsername(state);
    const response = await diagramAPI.sendFile(username, filename, ser);
    if (response && response.status === 201) {
        dispatch(setFile(response.data));
    } else {
        console.error('Some error sendFile')
    } 
}


export default diagramReducer;