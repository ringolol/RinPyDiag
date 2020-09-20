import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { AppStateType } from '../../redux/store';
import About from './About';

type MapStatePropsType = {
    
}
type MapDispatchPropsType = {
    
}
type OwnPropsType = {
}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

const AboutContainer: React.FC<PropsType> = (props) => {
    return ( 
        <About /> 
    );
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    
}) 


export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {}),
    withAuthRedirect
)(AboutContainer);