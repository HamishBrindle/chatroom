import React, { Component } from "react"
import { Switch, Route, Link } from 'react-router-dom'

import Home from './Home';
import Chat from './Chat';
import NotFound from './NotFound';

/**
 * Main component
 */
class Main extends Component {

	render() {

		return (
			<main>
				<Link className="app-header" to="/"><h1>Yummy Chat</h1></Link>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route path='/rooms' component={Chat}/>
					<Route path="*" component={NotFound} />
				</Switch>
			</main>
		)
	}

}

export default Main