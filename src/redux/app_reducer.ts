import { DiagApplication } from '../diagram_engine/diagram_app';

const SET_DIAGRAM_APP = 'auth/SET_DIAGRAM_APP';

let initialState = {
    diagramApp: null as any
};
export type InitialStateType = typeof initialState;

const appReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {
        case SET_DIAGRAM_APP: {
            return {
                ...state,
                diagramApp: action.diagramApp
            }
        }
        default:
            return state;
    }  
}

type SetDiagramAppActionType = {
    type: typeof SET_DIAGRAM_APP
    diagramApp: any
}
export const setDiagramApp = (diagramApp: any): SetDiagramAppActionType => ({ type: SET_DIAGRAM_APP, diagramApp });


export const createDiagramApp = () => (dispatch: any) => {
    const diagramApp = new DiagApplication();
    dispatch(setDiagramApp(diagramApp));
}

export default appReducer;