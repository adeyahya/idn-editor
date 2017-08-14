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
	setColor
} from '../../../actions';
import Gallery from './Gallery';
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
			self.props.toggleGallery(self.props.id)
			return
		}

		const reader = new FileReader();
		reader.readAsDataURL(files[0]);
		let img = document.createElement('img')
		let formData = new FormData();
		formData.append('image', files[0])

		import('superagent').then(request => {
			request
				.post('https://api.imgur.com/3/image')
				.send(formData)
				.set('Authorization', 'Bearer 76951193ccff6574ffc64d89b8d7217b536f681a')
				.on('progress', event => {
					self.props.updateProgress(self.props.id, event.percent)
				})
				.end(function(err, res){
			     if (err || !res.ok) {
			     	self.props.uploadEnd(self.props.id);
		        alert('Error upload!');
			      self.props.updateValue(self.props.id, '')
			     } else {
			       self.props.updateValue(self.props.id, res.body.data.link)
			       self.props.uploadEnd(self.props.id);
			     }
			   });
		})

		reader.onloadend = function() {
			img.src = reader.result
			self.props.updateValue(self.props.id, reader.result);
			self.props.uploadStart(self.props.id);
		}

		// get dominant color of an image
		img.onload = function() {
			let ct = new ColorThief()
			self.props.setColor(self.props.id, `rgb(${ ct.getColor(img).join(', ') })`)
		}
  }

	render() {
		return (
			<div className="image-gallery">
				<Dropzone className="box" accept="image/*" onDrop={this.onDrop}>
				  <p>Try dropping some files here, or click to select files to upload.</p>
				  <button onClick={ (e) => { e.stopPropagation(); this.props.toggleGallery(this.props.id) } }>Open Gallery</button>
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
    setColor: (index, color) => dispatch(setColor(index, color)),
  }
}

DropBox = connect(mapStateToProps, mapDispatchToProps)(DropBox)

export default DropBox;
