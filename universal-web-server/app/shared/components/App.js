import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom';

import Home from './Home';

class App extends Component {
	constructor(){
		super();
		this.state = {};
	}
	componentWillMount(){
		const { state } = this.props;
		this.setState(state);
	}

	render() {
		return (
			<div>
            Your React Node app is set up!
				<Switch>
					<Route path="/" exact component={(props) => (<Home games={this.state.games} {...props} />)}/>
					{/*<Route path="/pokemon" exact render={() => (<Redirect to="/pokemon/ability/telepathy" />)} />
					<Route path="/pokemon/ability/:ability" render={location => (<List pokemon={pokemon.list} location={location} />)} />*/}
				</Switch>
			</div>
		);
	}
}

export default App;