import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Login from './Login';
import { onLogIn } from '../../redux/auth_reducer';
import { AppStateType } from '../../redux/store';

type MapStatePropsType = {
    
}
type MapDispatchPropsType = {
    onLogIn: (username: string, password: string) => void
}
type OwnPropsType = {
}
export type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

const LoginContainer: React.FC<PropsType> = (props) => {
    return ( 
        <Login {...props} /> 
    );
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    
}) 


export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, { 
    onLogIn
})(LoginContainer);