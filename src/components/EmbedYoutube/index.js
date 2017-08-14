import React from 'react';
import { connect } from 'react-redux';
import { removeSection, updateValue } from '../../../actions'
import url from '../../utils/url'

class EmbedYoutube extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			html: '',
			class: 'fb-post',
			warn: '',
			errorMessage: 'URL Not Valid! make sure your url included https or http and the link is come from youtube.com'
		};

		this.handleRemove = this._handleRemove.bind(this);
	}

	componentWillMount() {
		const removable = () => {
  		if (typeof this.props.data[this.props.id].removable == 'undefined')
  			return true

  		return this.props.data[this.props.id].removable
  	}

  	this.setState({
  		removable: removable()
  	})

		if (this.props.value != '')
			this.setState({
				html: this.props.value,
			})
	}

	_handleRemove() {
		this.props.removeSection(this.props.id)
	}
	_onChange(e) {
		this.setState({
			warn: ''
		})
		let elem = this.elem
		if (e.keyCode == 13) {
			let result = url.youtubeId(e.target.value);
			if (!result) {
				this.setState({
					warn: this.state.errorMessage
				})
				return;
			}

			this.props.updateValue(this.props.id, `https://www.youtube.com/embed/${result}`);
			this.setState({
				html: `https://www.youtube.com/embed/${result}`
			})
			return;
		}
	}

	render() {
		return(
			<div className="relative">
				{ !this.state.removable ? null : <button onClick={ this.handleRemove }className="remove-btn"><i className="fa fa-times"></i></button> }
				{ this.state.html === '' ? <input className="input-link" type="text" onKeyUp={ (e) => this._onChange(e) } placeholder="Link Youtube here .."/> : <div><iframe width="100%" height="420" src={ this.state.html } frameborder="0" allowFullScreen></iframe></div> }

				{ this.state.warn == '' ? null : <div className="warn"> { this.state.warn } </div> }
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
  	updateValue: (index, value) => dispatch(updateValue(index, value))
  }
}

EmbedYoutube = connect(mapStateToProps, mapDispatchToProps)(EmbedYoutube);

export default EmbedYoutube;
