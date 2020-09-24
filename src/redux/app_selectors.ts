import { AppStateType } from "./store";

export const getDiagramApp = (state: AppStateType) => state.app.diagramApp;
export const getIsInitialized = (state: AppStateType) => state.app.isInitialized;