import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { getIsAuth } from './redux/auth_selectors';
import { getAutoAuth } from './redux/auth_reducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import About from './components/About/About';
import LoginContainer from './components/Login/LoginContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import { createDiagramApp } from './redux/app_reducer';
import DiagramContainer from './components/Diagram/DiagramContainer';

class App extends React.Component {
	componentDidMount() {
		this.props.getAutoAuth();
		this.props.createDiagramApp();
	}

	render() {
		if (!this.props.isAuth) return <LoginContainer />
		return (
			<HashRouter>
				<HeaderContainer />
				<Switch>
					<Route exact path='/'
						render={ () => <Redirect to={'/widget'} />} />
					<Route path='/login'
						render={() => <LoginContainer /> } />
					<Route path='/widget'
						render={() => <DiagramContainer /> } />
					<Route path='/about'
						render={() => <About /> } />
				</Switch>
			</HashRouter>
		)
	}
	
};

const mapStatetoProps = (state) => ({
	isAuth: getIsAuth(state)
})
  
export default compose(
	connect(mapStatetoProps, {
		getAutoAuth,
		createDiagramApp
	})
)(App);
