import React from 'react';
import Header from './Header';
import { onLogOut } from '../../redux/auth_reducer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/store';
import { sendFile } from '../../redux/diagram_reducer';
import { getDiagramApp } from '../../redux/app_selectors';
import { getIsMount } from '../../redux/diagram_selectors';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';


type MapStatePropsType = {
    diagramApp: any
    isMounted: boolean
}
type MapDispatchPropsType = {
    onLogOut: () => void
    sendFile: (filename: string, ser: string) => void
}
type OwnPropsType = {
    
}
export type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

const HeaderContainer: React.FC<PropsType> = (props) => {

    return ( 
        <Header {...props} /> 
    );
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    diagramApp: getDiagramApp(state),
    isMounted: getIsMount(state)
}) 


export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, { 
    onLogOut, 
    sendFile
    }),
    withAuthRedirect
)(HeaderContainer);