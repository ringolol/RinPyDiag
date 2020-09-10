import React from 'react';
import Header from './Header';
import { onLogOut } from '../../redux/auth_reducer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/store';
import { DiagApplication } from '../DemoCanvas/DiagApplication';
import { sendFile } from '../../redux/blocks_reducer';


type MapStatePropsType = {

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
    const app = new DiagApplication();

    return ( 
        <Header {...props} app={ app } /> 
    );
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    
}) 


export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, { 
    onLogOut, 
    sendFile
    })
)(HeaderContainer);