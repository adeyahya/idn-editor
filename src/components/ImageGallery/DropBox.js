import React from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import {
	removeSection,
	updateValue,
	uploadStart,
	uploadEnd,
	updateProgress,
	toggleGallery,
	setColor,
	toggleMultipleUpload
} from '../../../actions';
import Gallery from './Gallery';
import MultipleUpload from './MultipleUpload';
import ColorThief from '../../utils/color-thief.js';

class DropBox extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			files: [],
			gallery: false
		};

		this.onDrop = this._onDrop.bind(this);
	}

	_onDrop(files) {
		let self = this

		if ( files.length > 1 ) {
			this.setState({
				fileEntry: files
			})
			this.props.toggleMultipleUpload(this.props.id);
			return
		}

		let formData = new FormData();
		formData.append('image', files[0]);

		import(/* webpackChunkName: "superagent" */ 'superagent').then(request => {
			request
				.post('http://localhost:8080/api/image')
				.send(formData)
				.on('progress', event => {
					self.props.updateProgress(self.props.id, event.percent)
				}).end(function(err, res) {
					if (err || !res.ok) {
						self.props.uploadEnd(self.props.id);
						alert('Error upload!');
						self.props.updateValue(self.props.id, '')
					} else {
						self.props.updateValue(self.props.id, `/uploads/${res.body.filename}`)
						self.props.uploadEnd(self.props.id);
					}
				})
			})

		const reader = new FileReader();
		reader.readAsDataURL(files[0]);
		let img = document.createElement('img')

		reader.onloadend = function() {
			img.src = reader.result
			self.props.updateValue(self.props.id, reader.result);
			self.props.uploadStart(self.props.id);
		}
  }

	render() {
		return (
			<div className="image-gallery">
				{ this.props.data[this.props.id].multipleupload ? <MultipleUpload id={ this.props.id } fileEntry={ this.state.fileEntry }/> : null }
				<Dropzone className="box" accept="image/*" onDrop={this.onDrop}>
				  <p>Try dropping some files here, or click to select files to upload.</p>
				  { this.props.data[this.props.id].multipleupload ? <p>Uploading Images</p> : <button onClick={ (e) => { e.stopPropagation(); this.props.toggleGallery(this.props.id) } }>Open Gallery</button> }
				</Dropzone>
				{ this.props.data[this.props.id].gallery ? <Gallery id={this.props.id}></Gallery> : null }
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
    updateProgress: (index, value) => dispatch(updateProgress(index, value)),
    uploadStart: (index) => dispatch(uploadStart(index)),
    uploadEnd: (index) => dispatch(uploadEnd(index)),
    toggleGallery: (index) => dispatch(toggleGallery(index)),
    toggleMultipleUpload: (index) => dispatch(toggleMultipleUpload(index)),
    setColor: (index, color) => dispatch(setColor(index, color)),
  }
}

DropBox = connect(mapStateToProps, mapDispatchToProps)(DropBox)

export default DropBox;
