import React from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/store';
import { getIsFetching, getIsRegistered } from '../../redux/auth_selectors';
import Register from './Register';
import { register } from '../../redux/auth_reducer';
import LoginContainer from '../Login/LoginContainer';
import { Redirect } from 'react-router-dom';

type MapStatePropsType = {
    isRegistered: boolean
    isFetching: boolean
}
type MapDispatchPropsType = {
    register: (
        username: string, password: string, password_confirm: string,
        first_name?: string, last_name?: string, email?: string
    ) => void
}
type OwnPropsType = {
}
export type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

const RegisterContainer: React.FC<PropsType> = (props) => {
    
    if (!props.isRegistered) return <Register {...props} />
    return <Redirect to='login' />
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isRegistered: getIsRegistered(state),
    isFetching: getIsFetching(state)
}) 


export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, { 
    register
})(RegisterContainer);