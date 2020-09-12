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
import { getIsAuth, getToken } from '../../redux/auth_selectors';
import { compose } from 'redux';
import { getDiagramApp } from '../../redux/app_selectors';

type MapStatePropsType = {
    blocks: Array<BloksType>
    files: Array<FilesType>
    isLoaded: boolean
    filename: string
    isAuth: boolean
    token: string | null
    diagramApp: any
}
type MapDispatchPropsType = {
    setFileName: (filename: string) => SetFileNameActionType 
    sendFile: (filename: string, ser: string) => void
    downloadContent: (token: string | null) => void
    setIsMount: (isMounted: boolean) => SetIsMountActionType
}
type OwnPropsType = {
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
    token: getToken(state),
    diagramApp: getDiagramApp(state)
}) 


export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    setFileName, 
    downloadContent,
    sendFile, 
    setIsMount
    })
)(DiagramContainer);
