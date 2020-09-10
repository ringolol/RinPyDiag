import React from 'react';
import DemoCanvasContainer from './components/DemoCanvas/DemoCanvasContainer';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { getIsAuth } from './redux/auth_selectors';
import { getAutoAuth } from './redux/auth_reducer';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Header from './components/Header/Header';
import About from './components/About/About';

class App extends React.Component {
	componentDidMount() {
		this.props.getAutoAuth();
	}

	render() {
		if (!this.props.isAuth) return <Login />
		return (
			<HashRouter>
				<Header />
				<Switch>
					<Route exact path='/'
						render={ () => <Redirect to={'/widget'} />} />
					<Route path='/login'
						render={() => <Login /> } />
					<Route path='/widget'
						render={() => <DemoCanvasContainer /> } />
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
	getAutoAuth})
)(App);
