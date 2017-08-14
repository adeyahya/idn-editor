import React from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { removeSection, updateValue } from '../../../actions';

import DropBox from './DropBox.js';
import Image from './Image.js';

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
  		if (typeof this.props.data[this.props.id].removable == 'undefined')
  			return true

  		return this.props.data[this.props.id].removable
  	}

		this.setState({
			value: this.props.value,
			removable: removable()
		})
	}

	render() {
		return (
			<div className="image-gallery relative">
				{ !this.state.removable ? null : <button onClick={ this.handleRemove }className="remove-btn"><i className="fa fa-times"></i></button> }
				{ this.props.data[this.props.id].value == '' ? <DropBox id={ this.props.id }/> : <Image id={ this.props.id }/> }
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

ImageGallery = connect(mapStateToProps, mapDispatchToProps)(ImageGallery)

export default ImageGallery;
