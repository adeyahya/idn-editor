import React from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import {
	removeSection,
	updateValue,
	uploadStart,
	uploadEnd,
	updateProgressUpload,
	toggleGallery,
	setColor,
	toggleMultipleUpload,
	uploadImage,
} from '../../../actions';
import request from 'superagent';

import Gallery from './Gallery';
import MultipleUpload from './MultipleUpload';

class DropBox extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			files: [],
			gallery: false,
		};

		this.options = {
			maxUploadSize: 1024, // in kilobyte
			toBigMessage: 'Gagal Unggah Gambar, Ukuran gambar maksimal adalah 1MB sedangkan ukuran file yang anda unggah adalah'
		}

		this.onDrop = this._onDrop.bind(this);
	}

	_onDrop(files) {
		let self = this

		// Multiple upload
		if ( files.length > 1 ) {
			this.setState({
				fileEntry: files
			})
			this.props.toggleMultipleUpload(this.props.id);
			return
		}

		if (files[0].size / 1024 > this.options.maxUploadSize) {
			alert(`${this.options.toBigMessage} ${Number((files[0].size / 1024 / 1000).toFixed(1))}MB`);
			return;
		}

		let formData = new FormData();
		formData.append('image', files[0]);

		const reader = new FileReader();
		reader.readAsDataURL(files[0]);
		let img = document.createElement('img')

		reader.onloadend = function() {
      img.src = reader.result;
      img.onload = function() {
        formData.append('width', img.naturalWidth);
        formData.append('height', img.naturalHeight);
        self.props.uploadImage(self.props.id, formData, img.src, 'http://localhost:8080/api/image');
      }
		}
  }

	render() {
		return (
			<div className="image-gallery">
				{ this.props.data.multipleupload ? <MultipleUpload id={ this.props.id } fileEntry={ this.state.fileEntry }/> : null }
				<Dropzone className="box" accept="image/*" onDrop={this.onDrop}>
				  <p>Try dropping some files here, or click to select files to upload.</p>

				  { this.props.data.multipleupload ? <p>Uploading Images</p> : <div className="text-center btn-group"><button onClick={ (e) => { e.stopPropagation(); this.props.toggleGallery(this.props.id) } }>Open Gallery</button></div> }
				</Dropzone>
				{ this.props.data.gallery ? <Gallery id={this.props.id}></Gallery> : null }
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
  	removeSection: index => dispatch(removeSection(index)),
    updateValue: (index, value) => dispatch(updateValue(index, value)),
    updateProgressUpload: (index, value) => dispatch(updateProgressUpload(index, value)),
    uploadStart: (index) => dispatch(uploadStart(index)),
    uploadEnd: (index) => dispatch(uploadEnd(index)),
    toggleGallery: (index) => dispatch(toggleGallery(index)),
    toggleMultipleUpload: (index) => dispatch(toggleMultipleUpload(index)),
    setColor: (index, color) => dispatch(setColor(index, color)),
    uploadImage: (index, file, endpoint) => dispatch(uploadImage(index, file, endpoint)),
  }
}

DropBox = connect(mapStateToProps, mapDispatchToProps)(DropBox)

export default DropBox;
