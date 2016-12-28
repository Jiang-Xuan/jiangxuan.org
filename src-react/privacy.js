'use strict'

import React from 'react'
import util from './lib/util'
import {SmartBlockComponent} from './BaseComponent/index'
import UserCenter from './module/UserCenter'

import './about.less'

export default class Privacy extends SmartBlockComponent {
	constructor(props) {
		super(props)
		let query = util.query()
		this.unionId = query.unionId
	}

	componentDidMount() {
		UserCenter.getLawInfo(this.unionId)
		 .subscribe(this)
		 .fetch()
	}

	onSuccess(result) {
		this.setState({
			loading: false,
			success: true,
			privateNotes: result.data.privateNotes,
		})
	}

	render() {
		return(
				<div className="about-page privacy-page page" id="J_Page">
					<div className="content" id="J_Content" dangerouslySetInnerHTML={{__html: this.state.privateNotes}}>
					</div>
				</div>
			)
	}
}