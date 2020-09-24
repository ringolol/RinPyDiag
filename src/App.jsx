import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { getIsAuth } from './redux/auth_selectors';
import { connect } from 'react-redux';
import { compose } from 'redux';
import LoginContainer from './components/Login/LoginContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import { startInitialization } from './redux/app_reducer';
import DiagramContainer from './components/Diagram/DiagramContainer';
import styled from '@emotion/styled';
import RegisterContainer from './components/Register/RegisterContainer';
import AboutContainer from './components/About/AboutContainer';
import Preloader from './components/common/Preloader/Preloader';
import { getIsInitialized } from './redux/app_selectors';

class App extends React.Component {
	componentDidMount() {
		this.props.startInitialization();
	}

	render() {
		return (
			<HashRouter>
				{ this.props.isInitialized
					? 
					<Container>
						<HeaderContainer />
						<Switch>
							<Route exact path='/'
								render={ () => <Redirect to={'/diagram'} />} />
							<Route path='/login'
								render={() => <LoginContainer /> } />
							<Route path='/register'
								render={() => <RegisterContainer /> } />
							<Route path='/diagram'
								render={() => <DiagramContainer /> } />
							<Route path='/about'
								render={() => <AboutContainer /> } />
						</Switch>
					</Container>
					: 
					<Preloader template='FULL_SCREEN' /> }
			</HashRouter>
		)
	}
	
};

const mapStatetoProps = (state) => ({
	isAuth: getIsAuth(state),
	isInitialized: getIsInitialized(state)
})
  
export default compose(
	connect(mapStatetoProps, {
		startInitialization
	})
)(App);


const Container = styled.div `
	height: 100vh;
`
