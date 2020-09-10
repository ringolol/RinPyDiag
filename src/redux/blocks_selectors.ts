import { createSelector } from "reselect";
import { AppStateType } from "./store";

export const getBlocks = (state: AppStateType) => {
    return state.blocksPage.blocks;
}

export const getFiles = (state: AppStateType) => {
    return state.blocksPage.files;
}

export const getIsLoaded = (state: AppStateType) => {
    return state.blocksPage.isLoaded;
}

export const getText = (state: AppStateType) => {
    return state.blocksPage.filename;
}