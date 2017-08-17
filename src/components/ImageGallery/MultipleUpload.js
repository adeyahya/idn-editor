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

class MultipleUpload extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			imagePreview: '',
			processed: 1
		};
	}

	componentWillMount() {
		this.setState({
			perProcess: 100 / this.props.fileEntry.length,
			length: this.props.fileEntry.length,
			percentDone: 2
		})
	}

	componentDidMount() {
		this._upload(this.props.fileEntry);
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

			import(/* webpackChunkName: "superagent" */ 'superagent').then(request => {
				request
					.post('http://localhost:8080/api/image')
					.send(formData)
					.end(function(err, res) {
						if (err || !res.ok) {
							alert('Error upload!');
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
		})
	}

	render() {
		const styles = {
			progress: {
				width: `${this.state.percentDone}%`
			}
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
