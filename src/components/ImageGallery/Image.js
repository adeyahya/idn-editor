import React from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import {
	updateValue,
	toggleGallery
} from '../../../actions';

class Image extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			files: [],
			value: '',
			title: '',
			source: ''
		};
		this.handleChange = this._handleChange.bind(this)
	}

	componentWillMount() {
		this.setState({
			value: this.props.value,
		})
	}

	_handleChange() {
		this.props.updateValue(this.props.id, '')
		this.props.toggleGallery(this.props.id)
	}

	render() {
		let style = {
			height: '4px',
			width: `${this.props.data[this.props.id].progressNumber}%`,
			backgroundColor: 'black'
		}
		const changeButton = () => {
			 return (
			 	<button className="change-button" onClick={ this.handleChange }>
			 		<i className="fa fa-camera"></i> Change Image
			 	</button>
			)
		}
		return (
			<div ref={ (el) => { this.imageWrapper = el } }>
				{ this.props.data[this.props.id].uploading ? null : changeButton() }
				<figure>
					<img className={ this.props.data[this.props.id].uploading ? 'max grey' : 'max' } src={ this.props.data[this.props.id].value } alt=""/>
				</figure>
				{ this.props.data[this.props.id].uploading ? <div className="progress" style={ style }/> : null }
				{ this.props.data[this.props.id].uploading ?
					<p className="progress-number">Uploading <strong>{this.props.data[this.props.id].progressNumber}%</strong></p>
				: null }
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.draft.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  	updateValue: (index, value) => dispatch(updateValue(index, value)),
  	toggleGallery: index => dispatch(toggleGallery(index))
  }
}

Image = connect(mapStateToProps, mapDispatchToProps)(Image)

export default Image;
