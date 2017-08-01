import React from 'react'
import Promise from 'bluebird'
import { connect } from 'react-redux'
import { removeSection, updateValue } from '../../../actions'

class EmbedTwitter extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			html: ''
		}

		this.handleRemove = this._handleRemove.bind(this)
	}

	componentWillMount() {
		this.setState({
			html: this.props.value
		})
	}

	componentDidMount() {
		this._loadScript('//platform.twitter.com/widgets.js')
	}

	_handleRemove() {
		this.props.removeSection(this.props.id)
	}

	_loadScript(url) {
		return new Promise((resolve, reject) => {
			let script = document.createElement('script'), done = false,
			     head = document.getElementsByTagName("head")[0];
			 script.src = url;
			 script.onload = script.onreadystatechange = function(){
			   if ( !done && (!this.readyState ||
			        this.readyState == "loaded" || this.readyState == "complete") ) {
			     done = true;
			     resolve()

			    // IE memory leak
			    script.onload = script.onreadystatechange = null;
			    head.removeChild( script );
			  }
			};
			head.appendChild(script);
		})
	}

	_runScript(script) {
		const body = document.getElementsByTagName('body')[0]
		const s = document.createElement('script');
    s.type = 'text/javascript';
    s.innerHTML = script;
    body.appendChild(s);
	}

	_onChange(e) {
		if (e.keyCode == 13) {
			this.setState({
				html: e.target.value
			})
			this.props.updateValue(this.props.id, e.target.value)
			e.target.value = ''
			this._loadScript('//platform.twitter.com/widgets.js')
		}
	}

	render() {
		return (
			<div className="relative">
				<button 
					onClick={ this.handleRemove }
					className="remove-btn">
					  <i className="fa fa-times"></i>
					</button>
				{ this.state.html === '' ? <input className="input-link" type="text" onKeyUp={ (e) => this._onChange(e) } placeholder="Link twitter post here .."/> : <blockquote className="twitter-tweet" data-lang="en"><a href={ this.state.html }></a></blockquote> }
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeSection: index => dispatch(removeSection(index)),
    updateValue: (index, value) => dispatch(updateValue(index, value)),
  }
}

EmbedTwitter = connect(mapStateToProps, mapDispatchToProps)(EmbedTwitter)

export default EmbedTwitter