import React, { useEffect } from 'react';
import {
    setFileName, 
    sendFile,  
    SetFileNameActionType,
    downloadContent, setIsMount, SetIsMountActionType
} from '../../redux/diagram_reducer';
import { connect } from 'react-redux';
import Diagram from './Diagram';
import { getBlocks, getFiles, getIsLoaded, getText } from '../../redux/diagram_selectors';
import { AppStateType } from '../../redux/store';
import { BloksType, FilesType } from '../../types/types';
import { getIsAuth } from '../../redux/auth_selectors';
import { compose } from 'redux';
import { getDiagramApp } from '../../redux/app_selectors';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { DiagApplication } from '../../diagram_engine/diagram_app';
import { DiagNodeModel } from './Node/DiagNodeModel';

type MapStatePropsType = {
    blocks: Array<BloksType>
    files: Array<FilesType>
    isLoaded: boolean
    filename: string
    isAuth: boolean
    diagramApp: DiagApplication
}
type MapDispatchPropsType = {
    setFileName: (filename: string) => SetFileNameActionType 
    sendFile: (filename: string, ser: string) => void
    downloadContent: () => void
    setIsMount: (isMounted: boolean) => SetIsMountActionType
}
export type StatesTypes = {
    selectedNode: DiagNodeModel | null,
    showParModal: boolean,
    diagOutput: string,
}
type OwnPropsType = {

}
export type ParModalStatesTypes = {
    selectedNodesPars: any,
    selectedNodesStates: any,
}
export type ParModalPropsTypes = {
    selectedNode: DiagNodeModel | null,
    show: boolean,
    onClose: any,
}
export type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

const DiagramContainer: React.FC<PropsType> = (props) => {

    useEffect(() => {
        props.setIsMount(true);
        return () => { 
            props.setIsMount(false) 
        }
    })
    
    return ( 
        <Diagram {...props} /> 
    );
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    blocks: getBlocks(state),
    files: getFiles(state),
    isLoaded: getIsLoaded(state),
    filename: getText(state),
    isAuth: getIsAuth(state),
    diagramApp: getDiagramApp(state)
}) 


export default compose(
    compose(
        connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
        setFileName, 
        downloadContent,
        sendFile, 
        setIsMount
        }),
        withAuthRedirect
    )
)(DiagramContainer);
