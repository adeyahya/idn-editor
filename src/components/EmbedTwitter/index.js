import React from 'react'
import request from 'superagent'
import Promise from 'bluebird'

class EmbedTwitter extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			html: ''
		}
	}

	componentWillMount() {
		this.setState({
			html: this.props.value
		})
	}

	componentDidMount() {
		this._loadScript('//platform.twitter.com/widgets.js')
	}

	_loadScript(url, completeCallback) {
		let script = document.createElement('script'), done = false,
		     head = document.getElementsByTagName("head")[0];
		 script.src = url;
		 script.onload = script.onreadystatechange = function(){
		   if ( !done && (!this.readyState ||
		        this.readyState == "loaded" || this.readyState == "complete") ) {
		     done = true;
		     // completeCallback();

		    // IE memory leak
		    script.onload = script.onreadystatechange = null;
		    head.removeChild( script );
		  }
		};
		head.appendChild(script);
	}

	_onChange(e) {
		if (e.keyCode == 13) {
			this.setState({
				html: e.target.value
			})
			e.target.value = ''
		}
		this._loadScript('//platform.twitter.com/widgets.js')
	}

	render() {
		return (
			<div>
				{ this.state.html === '' ? <input className="input-link" type="text" onKeyUp={ (e) => this._onChange(e) } placeholder="Link twitter post here .."/> : <blockquote className="twitter-tweet" data-lang="en"><a href={ this.state.html }></a></blockquote> }
			</div>
		)
	}
}

export default EmbedTwitter