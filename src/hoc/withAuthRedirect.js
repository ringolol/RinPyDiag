import React from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { getIsAuth } from '../redux/auth_selectors';


const mapStateToProps = (state) => ({
    isAuth: getIsAuth(state)
});

export const withAuthRedirect = (Component) => {

    const RedirectComponent = (props) => {
        if (!props.isAuth) return <Redirect to='/login' />
        return <Component {...props} />
    }

    const connectedRedirectComponent = connect(mapStateToProps)(RedirectComponent);

    return connectedRedirectComponent;
}