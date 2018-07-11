import React, { Component } from "react"
import { Switch, Route } from 'react-router-dom'

import Home from './Home';
import Chat from './Chat';
import NotFound from './NotFound';

class Main extends Component {

	render() {

		return (
			<main>
				<h1 className="app-header">Yummy Chat</h1>
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