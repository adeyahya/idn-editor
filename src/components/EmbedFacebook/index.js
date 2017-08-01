import React from 'react'
import Promise from 'bluebird'
import { connect } from 'react-redux'
import { removeSection, updateValue } from '../../../actions'
import url from '../../utils/url'
import root from 'window-or-global'

class EmbedFacebook extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			html: '',
			class: 'fb-post'
		}

		this.handleRemove = this._handleRemove.bind(this)
	}

	componentWillMount() {
		this.setState({
			html: this.props.value
		})
	}

	componentDidMount() {
		if (this.state.html != '') {
			this._renderFacebook(this.state.html)
				.then(res => {
					this.setState({
						html: res.url,
						class: res.type
					})
					this.props.updateValue(this.props.id, res.url)
					setTimeout(function() {
						root.FB.XFBML.parse()
					}, 1000)
				})
		}
	}

	_renderFacebook(payload) {
		return new Promise(function(resolve, reject) {
			let type = ""
			let result = payload
			let crackedUrl = url.crack(result)

			if (!crackedUrl || crackedUrl.host != 'facebook.com') {
				reject('not valid url')
			}

			switch(crackedUrl.type) {
				case 'comment_id':
					type = 'fb-comment-embed'
					break
				case 'videos':
					type = 'fb-video'
					break
				default:
					type = 'fb-post'
					break
			}

			resolve({ url: result, type: type })
		})
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
			this._renderFacebook(e.target.value)
				.then(res => {
					this.setState({
						html: res.url,
						class: res.type
					})
					this.props.updateValue(this.props.id, res.url)
					setTimeout(function() {
						root.FB.XFBML.parse()
					}, 1000)
				}).catch(err => {
					console.log(err)
				})
			e.target.value = ''
		}
	}

	_handleRemove() {
		this.props.removeSection(this.props.id)
	}

	render() {
		return (
			<div className="relative">
				<button 
					onClick={ this.handleRemove }
					className="remove-btn">
					  <i className="fa fa-times"></i>
					</button>
				{ this.state.html === '' ? <input className="input-link" type="text" onKeyUp={ (e) => this._onChange(e) } placeholder="Link Facebook here .."/> : <div className={ this.state.class } data-href={ this.state.html }></div> }
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

EmbedFacebook = connect(mapStateToProps, mapDispatchToProps)(EmbedFacebook)

export default EmbedFacebook