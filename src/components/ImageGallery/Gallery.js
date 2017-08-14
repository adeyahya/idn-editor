import React from 'react'
import Unsplash from 'unsplash-js'
import { connect } from 'react-redux'
import {
removeSection,
toggleGallery,
updateValue } from '../../../actions'

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
	}
	componentDidMount() {
		document.querySelector('html, body').style.overflow = 'hidden';
	}
	componentWillMount() {
		let self = this
		import('superagent')
			.then(request => {
				request
					.get('https://api.imgur.com/3/account/me/images')
					.set('Authorization', 'Bearer 76951193ccff6574ffc64d89b8d7217b536f681a')
					.end(function(err, res) {
						if (err || !res.ok) {
				      alert('Error upload!');
				      self.props.updateValue(self.props.id, '')
				    } else {
							self.setState({
								photos: res.body.data
							})
				    }
					})
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

	_selectImage(unsplashUrl) {
		this.setState({
			value: unsplashUrl
		})
		this.props.updateValue(this.props.id, unsplashUrl)
		this.props.toggleGallery(this.props.id)
	}

	_handleRemove() {
		this.props.removeSection(this.props.id)
	}

	_mouseEnter() {
		// document.querySelector('html, body').style.overflow = 'hidden'
	}

	_mouseLeave() {
		// document.querySelector('html, body').style.overflow = 'initial'
	}

	componentWillUnmount() {
		document.querySelector('html, body').style.overflow = 'initial';
	}

	componentDidUpdate() {
		document.querySelector('html, body').style.overflow = 'initial'
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
					'#068D9D',
					'#53599A',
					'#6D9DC5',
					'#80DED9',
					'#AEECEF',
					'#FA9F42',
					'#0B6E4F',
					'#2B4162',
					'#55DBCB',
					'#39A2AE',
					'#75E4B3',
					'#BA2D0B'
				]

				return colors[Math.floor(Math.random() * colors.length)];
			}
			return (
				<div className="unsplash-gallery gallery-modal">
					<div className="unsplash-gallery--form">
						<form onSubmit={ this.handleSearch }>
							<input type="text" ref={ (input) => { this.inputSearch = input } } placeholder="Search Photos on Unsplash"/>
							<button style={ style.button } type="submit">Search</button>
						</form>
					</div>
					<div className="unsplash-gallery--wrapper" onMouseEnter={ this._mouseEnter } onMouseLeave={ this._mouseLeave }>
						{ this.state.photos.map((item, index) => {
							let backgroundColor = { backgroundColor: randomColor()}
							let dimension = item.height > item.width ? { width: '100%', height: 'auto' } : { width: 'auto', height: '105%' }
							return (
								<figure onClick={ () => this.selectImage(item.link) } key={ index } style={ backgroundColor }>
									<img style={ dimension } src={ item.link } alt=""/>
								</figure>
							)
						}) }
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
    updateValue: (index, value) => dispatch(updateValue(index, value))
  }
}

Gallery = connect(mapStateToProps, mapDispatchToProps)(Gallery)

export default Gallery
