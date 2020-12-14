import { getAutoAuth } from './auth_reducer';
import { ThunkAction } from 'redux-thunk';
import { DiagApplication } from '../diagram_engine/diagram_app';
import { AppStateType } from './store';

const SET_DIAGRAM_APP = 'app/SET_DIAGRAM_APP';
const SET_INITIALIZATION = 'app/SET_INITIALIZATION';

let initialState = {
    diagramApp: null as unknown as DiagApplication,
    isInitialized: false as boolean
};
export type InitialStateType = typeof initialState;

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case SET_DIAGRAM_APP: {
            return {
                ...state,
                diagramApp: action.diagramApp
            }
        }
        case SET_INITIALIZATION: {
            return {
                ...state,
                isInitialized: action.isInitialized
            }
        }
        default:
            return state;
    }  
}

type ActionsTypes = SetDiagramAppActionType | SetInitializationSuccessActionType;
type SetDiagramAppActionType = {
    type: typeof SET_DIAGRAM_APP
    diagramApp: DiagApplication
}
export const setDiagramApp = (diagramApp: DiagApplication): SetDiagramAppActionType => ({ type: SET_DIAGRAM_APP, diagramApp });
type SetInitializationSuccessActionType = {
    type: typeof SET_INITIALIZATION
    isInitialized: boolean
}
export const initializationSuccess = (isInitialized: boolean): SetInitializationSuccessActionType => ({ type: SET_INITIALIZATION, isInitialized });

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const createDiagramApp = (): ThunkType => async (dispatch) => {
    const diagramApp = new DiagApplication();
    dispatch(setDiagramApp(diagramApp));
}

export const startInitialization = (): ThunkType => async (dispatch) => {
    const diagram = dispatch(createDiagramApp());
    const authUser = dispatch(getAutoAuth());

    Promise.all([diagram, authUser])
    .then(() => {
        dispatch(initializationSuccess(true));
    });
}

export default appReducer;