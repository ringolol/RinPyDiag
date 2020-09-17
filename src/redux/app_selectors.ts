import { AppStateType } from "./store";

export const getDiagramApp = (state: AppStateType) => {
    return state.app.diagramApp;
}