import React from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { removeSection, updateValue } from '../../../actions';
import scrollToComponent from 'react-scroll-to-component';
import Image from './Image.js';
import DropBox from './DropBox';

class ImageGallery extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			files: [],
			value: '',
			title: ''
		};

		this.handleRemove = this._handleRemove.bind(this);
	}

	_handleRemove() {
		this.props.removeSection(this.props.id)
	}

	componentWillMount() {
		const removable = () => {
  		if (typeof this.props.data.removable == 'undefined')
  			return true

  		return this.props.data.removable
  	}

		this.setState({
			value: this.props.value,
			removable: removable()
		})
	}

	render() {
		return (
			<div className="image-gallery relative" ref={ (el) => { this.imageGallery = el } }>
				{ !this.state.removable ? null : <button onClick={ this.handleRemove }className="remove-btn"><i className="fa fa-times"></i></button> }
				{ this.props.data.value == '' ? <DropBox data={ this.props.data } id={ this.props.id }/> : <Image data={ this.props.data } id={ this.props.id }/> }
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

ImageGallery = connect(mapStateToProps, mapDispatchToProps)(ImageGallery)

export default ImageGallery;
