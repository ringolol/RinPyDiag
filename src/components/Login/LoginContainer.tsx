import React from 'react';
import { connect } from 'react-redux';
import Login from './Login';
import { onLogIn, setRegister, SetRegisterActionType } from '../../redux/auth_reducer';
import { AppStateType } from '../../redux/store';
import { getIsAuth } from '../../redux/auth_selectors';
import { Redirect } from 'react-router-dom';

type MapStatePropsType = {
    isAuth: boolean
}
type MapDispatchPropsType = {
    onLogIn: (login: string, password: string) => void
    setRegister: (isRegistered: boolean) => SetRegisterActionType
}
type OwnPropsType = {
}
export type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

const LoginContainer: React.FC<PropsType> = (props) => {
    if (!props.isAuth) return <Login {...props} />
    return <Redirect to='widget' />
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: getIsAuth(state)
}) 


export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, { 
    onLogIn, 
    setRegister
})(LoginContainer);