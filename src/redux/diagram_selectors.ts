import { createSelector } from "reselect";
import { AppStateType } from "./store";

export const getBlocks = (state: AppStateType) => {
    return state.diagramPage.blocks;
}

export const getFiles = (state: AppStateType) => {
    return state.diagramPage.files;
}

export const getIsLoaded = (state: AppStateType) => {
    return state.diagramPage.isLoaded;
}

export const getText = (state: AppStateType) => {
    return state.diagramPage.filename;
}