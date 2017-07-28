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
	}

	componentWillMount() {
		this.setState({
			html: this.props.value
		})
	}

	componentDidMount() {
		if (this.state.html != '') {
			switch(url.crack(this.state.html).type) {
				case 'comment_id':
					this.setState({
						class: 'fb-comment-embed'
					})
					break
				case 'videos': {
					this.setState({
						class: 'fb-video'
					})
					break
				}
			}
			setTimeout(function() {
				root.FB.XFBML.parse()
			}, 1000)
		}
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

			if (!url.crack(e.target.value)) {
				alert('Not Valid URL')
			}

			switch(url.crack(e.target.value).type) {
				case 'comment_id':
					this.setState({
						class: 'fb-comment-embed'
					})
					break
				case 'videos': {
					this.setState({
						class: 'fb-video'
					})
					break
				}
			}

			this.setState({
				html: e.target.value
			})
			this.props.updateValue(this.props.id, e.target.value)
			setTimeout(function() {
				root.FB.XFBML.parse()
			}, 1000)
			e.target.value = ''
		}
	}

	render() {
		return (
			<div className="relative">
				<button 
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
    data: state
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