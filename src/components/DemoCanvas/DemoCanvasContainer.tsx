import React from 'react';
import {
    setFileName, 
    sendFile,  
    SetFileNameActionType,
    downloadContent
} from '../../redux/blocks_reducer';
import { connect } from 'react-redux';
import BodyWidget from './BodyWidget';
import { getBlocks, getFiles, getIsLoaded, getText } from '../../redux/blocks_selectors';
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
}
type OwnPropsType = {
}
export type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

const DemoCanvasContainer: React.FC<PropsType> = (props) => {
    
    return ( 
        <BodyWidget {...props} /> 
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
    sendFile
    })
)(DemoCanvasContainer);
