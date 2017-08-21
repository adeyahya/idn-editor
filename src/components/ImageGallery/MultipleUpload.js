import React from 'react';
import { connect } from 'react-redux';
import {
	removeSection,
	updateValue,
	uploadStart,
	uploadEnd,
	updateProgress,
	toggleGallery,
	toggleMultipleUpload,
	setColor
} from '../../../actions';

import request from 'superagent';

class MultipleUpload extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			imagePreview: '',
			processed: 1,
			error: false,
			warning: false
		};
	}

	componentWillMount() {
		const files = this.props.fileEntry.filter(function(item) {
			return (item.size / 1024) < 1024;
		})

		const removed = this.props.fileEntry.filter(function(item) {
			return (item.size / 1024) > 1024;
		})

		if (files.length < 1) {
			alert('Setiap file yang anda unggah melebihi batas maksimum yaitu 1MB')
			this.props.toggleMultipleUpload(this.props.id)
			return
		}

		if (removed.length > 1) {
			this.setState({
				warning: true,
				warningMessage: `${ removed.length } files tidak dapat diunggah karena ukuran melebihi batas maksimal yaitu 1MB`
			})
		}

		this.setState({
			length: files.length,
			perProcess: 100 / files.length,
			percentDone: 100 / files.length,
		})
		this._upload(files);
	}

	_upload(files) {
		let self = this

		files.map(function(item, index) {
			if (index == 0) {
				const reader = new FileReader();
				reader.readAsDataURL(item);
				reader.onloadend = function() {
					self.setState({
						imagePreview: reader.result
					})
				}
			}
			let formData = new FormData();
			formData.append('image', item);

			request
				.post('http://localhost:8080/api/image')
				.send(formData)
				.end(function(err, res) {
					if (err || !res.ok) {
						console.warn('Error uploading ' + item);
					} else {
						self.setState({
							processed: self.state.processed + 1,
							percentDone: self.state.percentDone + self.state.perProcess,
							imagePreview: `/uploads/${res.body.filename}`
						})

						if (self.state.processed == self.state.length + 1) {
							self.props.toggleMultipleUpload(self.props.id)
							self.props.toggleGallery(self.props.id)
						}
					}
				})
		})
	}

	render() {
		const styles = {
			progress: {
				width: `${this.state.percentDone}%`
			}
		}

		const warning = () => {
			return (
				<div className="multiple-upload__footer warning">
					<p>
						{ this.state.warningMessage }
					</p>
				</div>
			)
		}

		return (
			<div className="multiple-upload">
				<div className="multiple-upload__body">
					<figure>
						<img src={ this.state.imagePreview }/>
					</figure>
					<aside>
						<div className="caption">
							<span className="caption__small">Uploading to</span>
							<span className="caption__large">Image Gallery</span>
							<span className="caption__medium">{this.state.processed} of {this.state.length}</span>
						</div>
						<span className="progressbar" style={  styles.progress }></span>
					</aside>
				</div>
				{ this.state.warning ? warning() : null }
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

MultipleUpload = connect(mapStateToProps, mapDispatchToProps)(MultipleUpload)

export default MultipleUpload;
