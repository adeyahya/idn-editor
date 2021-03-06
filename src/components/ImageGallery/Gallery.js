import React from 'react';
import { connect } from 'react-redux';
import {
removeSection,
toggleGallery,
update,
updateValue } from '../../../actions';
import request from 'superagent';
import Dropbox from 'dropbox';

class Gallery extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			photos: [],
			value: ''
		}

		this.handleUpload = () => this._handleUpload();
		this.handleSearch = this._handleSearch.bind(this)
		this.selectImage = this._selectImage.bind(this)
		this.handleRemove = this._handleRemove.bind(this)
		this.handleDropbox = this._handleDropbox.bind(this)
	}
	componentDidMount() {
		document.querySelector('html, body').style.overflow = 'hidden';
	}
	componentWillMount() {
		let self = this;
		request
			.get('http://localhost:8080/api/images')
			.end(function(err, res) {
				if (err || !res.ok) {
		      alert('Error upload!');
		      self.props.updateValue(self.props.id, '')
		    } else {
					self.setState({
						photos: res.body
					})
		    }
			})
	}

	_handleSearch(e) {
		if (e)
			e.preventDefault()

		this.setState({
			photos: []
		})
		this.inputSearch.value = ""
	}

	_selectImage(imageUrl, imageId, width, height) {
		this.setState({
			value: imageUrl
		})
    this.props.updateValue(this.props.id, imageUrl)
		this.props.update(this.props.id, {
      width: width,
      height: height
    })
		this.props.toggleGallery(this.props.id)
	}

	_handleRemove() {
		this.props.removeSection(this.props.id)
	}

	_handleDropbox() {
		let dbx = new Dropbox({ accessToken: 'JJnJIY-g8tQAAAAAAAACJQOLbYaAqMk4LkSmg__HkWktfNsAY5HZioq1cxBUZze3' });
		dbx.filesSearch({
			path: '',
			query: '*.png'
		}).then(function(response) {
		    console.log(response);
		  }).catch(function(error) {
		    console.log(error);
		  });
	}

	componentWillUnmount() {
		document.querySelector('html, body').style.overflow = 'initial';
	}

	render() {
		const style = {
			button: {
				display: 'none'
			},
			figure: {
				margin: '0'
			},
			image: {
				width: '100%'
			}
		}

		const unsplashSelector = () => {
			const randomColor = () => {
				const colors = [
					'#9BAF6C',
				]

				return colors[Math.floor(Math.random() * colors.length)];
			}
			return (
				<div className="unsplash-gallery gallery-modal">
					<div className="unsplash-gallery--wrapper" onMouseEnter={ this._mouseEnter } onMouseLeave={ this._mouseLeave }>
						<div className="gallery-wrap">
							{ this.state.photos.map((item, index) => {
								let backgroundColor = { backgroundColor: `rgb(${item.palette.DarkMuted._rgb.join(', ')})`}
								let dimension = Number(item.height) > Number(item.width) ? { width: '100%', height: 'auto' } : { width: 'auto', height: '105%' }
								return (
									<figure onClick={ () => this.selectImage(`/uploads/${item.filename}`, item._id, item.width, item.height) } key={ index } style={ backgroundColor }>
										<img style={ dimension } src={ `/uploads/thumb/${item.filename}` } alt=""/>
									</figure>
								)
							}) }
						</div>
					</div>

					<div className="unsplash-gallery--toolbar">
						<button onClick={ this.handleDropbox }>import from dropbox</button>
					</div>
				</div>
			)
		}

		const unsplashImage = () => {
			return (
				<figure style={ style.figure }>
					<img style={ style.image } src={ this.state.value } alt=""/>
				</figure>
			)
		}
		const styles = {
			overlay: {
				zIndex: '100'
			}
		}
		return (
			<div className="relative">
				<div className="overlay" style={ styles.overlay }>
					<button className="close-modal" onClick={ () => { this.props.toggleGallery(this.props.id) } }><i className="fa fa-times"></i></button>
					{ this.state.value === '' ? unsplashSelector() : unsplashImage() }
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
    toggleGallery: index => dispatch(toggleGallery(index)),
    updateValue: (index, value) => dispatch(updateValue(index, value)),
    update: (index, payload) => dispatch(update(index, payload)),
  }
}

Gallery = connect(mapStateToProps, mapDispatchToProps)(Gallery)

export default Gallery
