import React from 'react'
import { connect } from 'react-redux'
import { removeSection, updateValue } from '../../../actions'

class EmbedInstagram extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			html: ''
		}

		this.handleRemove = this._handleRemove.bind(this)
	}

	componentWillMount() {
		const removable = () => {
  		if (typeof this.props.data.removable == 'undefined')
  			return true

  		return this.props.data.removable
  	}

		this.setState({
			html: this.props.data.value,
			removable: removable()
		})
	}

	componentDidMount() {
		root.instgrm.Embeds.process()
	}

	componentDidUpdate() {
		root.instgrm.Embeds.process()
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

	_onChange(e) {
		if (e.keyCode == 13) {
			this.setState({
				html: e.target.value
			})
			this.props.updateValue(this.props.id, e.target.value)
			e.target.value = ''
		}
	}

	_handleRemove() {
		this.props.removeSection(this.props.id)
	}

	render() {
		const style = {
			background:'#FFF',
			border:'0',
			borderRadius:'3px',
			boxShadow:'0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
			margin: '1px',
			maxWidth:'658px',
			padding:'0',
			width:'99.375%',
			width:'-webkit-calc(100% - 2px)',
			width:'calc(100% - 2px)'
		}
		return (
			<div className="relative">
				{ !this.state.removable ? null : <button onClick={ this.handleRemove }className="remove-btn"><i className="fa fa-times"></i></button> }
				{ this.state.html === '' ? <input className="input-link" type="text" onKeyUp={ (e) => this._onChange(e) } placeholder="Link Instagram post here .."/> : <blockquote className="instagram-media" data-instgrm-captioned data-instgrm-version="7" style={style}><a href={ this.state.html } target="_blank"/>Fetching Post</blockquote> }
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
  return {
    // data: state.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeSection: index => dispatch(removeSection(index)),
    updateValue: (index, value) => dispatch(updateValue(index, value)),
  }
}

EmbedInstagram = connect(mapStateToProps, mapDispatchToProps)(EmbedInstagram)

export default EmbedInstagram
