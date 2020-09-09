import React from 'react';
import {
    setFileName, 
    sendFile, 
    setUserName, 
    setPassword,
    onLogIn,
    onLogOut, 
    SetFileNameActionType,
    SetUserNameActionType,
    SetPasswordActionType
} from '../../redux/blocks_reducer';
import { connect } from 'react-redux';
import BodyWidget from './BodyWidget';
import { DiagApplication } from './DiagApplication';
import { getBlocks, getFiles, getIsLoaded, getText, getUsername, getPassword } from '../../redux/blocks_selectors';
import { AppStateType } from '../../redux/store';
import { BloksType, FilesType } from '../../types/types';

type MapStatePropsType = {
    blocks: Array<BloksType>
    files: Array<FilesType>
    isLoaded: boolean
    filename: string
    username: string
    password: string
}
type MapDispatchPropsType = {
    setFileName: (filename: string) => SetFileNameActionType 
    sendFile: (filename: string, ser: string) => void
    setUserName: (username: string) => SetUserNameActionType
    setPassword: (password: string) => SetPasswordActionType
    onLogIn: (username: string, password: string) => void
    onLogOut: () => void
}
type OwnPropsType = {
    app: any
}
export type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

const DemoCanvasContainer: React.FC<PropsType> = (props) => {
    const app = new DiagApplication();
    
    return ( 
        <BodyWidget {...props} app={ app } /> 
    );
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    blocks: getBlocks(state),
    files: getFiles(state),
    isLoaded: getIsLoaded(state),
    filename: getText(state),
    username: getUsername(state),
    password: getPassword(state),
}) 


export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    setFileName, 
    sendFile,
    setUserName,
    setPassword,
    onLogIn,
    onLogOut,
})(DemoCanvasContainer);
