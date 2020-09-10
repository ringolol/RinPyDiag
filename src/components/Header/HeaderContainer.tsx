import React from 'react';
import Header from './Header';
import { onLogOut } from '../../redux/auth_reducer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/store';


type MapStatePropsType = {

}
type MapDispatchPropsType = {
    onLogOut: () => void
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
    
}) 


export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, { 
    onLogOut
    })
)(HeaderContainer);