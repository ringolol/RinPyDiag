import React from 'react';
import Header from './Header';
import { onLogOut } from '../../redux/auth_reducer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/store';
import { sendFile } from '../../redux/blocks_reducer';
import { getDiagramApp } from '../../redux/app_selectors';


type MapStatePropsType = {
    diagramApp: any
}
type MapDispatchPropsType = {
    onLogOut: () => void
    sendFile: (filename: string, ser: string) => void
}
type OwnPropsType = {
    app: any
}
export type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

const HeaderContainer: React.FC<PropsType> = (props) => {

    return ( 
        <Header {...props} /> 
    );
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    diagramApp: getDiagramApp(state)
}) 


export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, { 
    onLogOut, 
    sendFile
    })
)(HeaderContainer);