import React from 'react'
import Unsplash from 'unsplash-js'
import { connect } from 'react-redux'
import { removeSection, updateValue } from '../../../actions'

class UnsplashGallery extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			photos: [],
			value: ''
		}

		this.handleUpload = () => this._handleUpload();
		this.unsplash = new Unsplash({
		  applicationId: "72b04f0837ce459c84c147913b87247a647f53b8a59866493206c3f37d1cadf2",
		  secret: "6ecf1d14ea76fef2f4d6bf5bd7c5ed344ff7b7da0086e4ca620527015df50be9",
		  callbackUrl: "http://localhost:3000"
		});
		this.handleSearch = this._handleSearch.bind(this)
		this.selectImage = this._selectImage.bind(this)
		this.handleRemove = this._handleRemove.bind(this)
	}
	componentWillMount() {
		if (this.props.value == '') {
			this.unsplash.photos.getRandomPhoto({ count: "60" })
			  .then(res => res.json())
			  .then(json => {
			    this.setState({
			    	photos: json
			    })
			  });
		} else {
			this.setState({
				value: this.props.value
			})
		}
	}

	_handleSearch(e) {
		if (e)
			e.preventDefault()

		this.setState({
			photos: []
		})

		this.unsplash.photos.searchPhotos(this.inputSearch.value, [], 1, 15)
		  .then(res => res.json())
		  .then(json => {
		    this.setState({
		    	photos: json
		    })
		    console.log(json)
		  });
		this.inputSearch.value = ""
	}

	_selectImage(unsplashUrl) {
		this.setState({
			value: unsplashUrl
		})
		this.props.updateValue(this.props.id, unsplashUrl)
	}

	_handleRemove() {
		this.props.removeSection(this.props.id)
	}

	_mouseEnter() {
		document.querySelector('html, body').style.overflow = 'hidden'
	}

	_mouseLeave() {
		document.querySelector('html, body').style.overflow = 'initial'
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
			return (
				<div className="unsplash-gallery">
					<div className="unsplash-gallery--form">
						<form onSubmit={ this.handleSearch }>
							<input type="text" ref={ (input) => { this.inputSearch = input } } placeholder="Search Photos on Unsplash"/>
							<button style={ style.button } type="submit">Search</button>
						</form>
					</div>
					<div className="unsplash-gallery--wrapper" onMouseEnter={ this._mouseEnter } onMouseLeave={ this._mouseLeave }>
						{ this.state.photos.map((item, index) => {
							let backgroundColor = { backgroundColor: item.color}
							let dimension = item.height > item.width ? { width: '100%', height: 'auto' } : { width: 'auto', height: '105%' }
							return (
								<figure onClick={ () => this.selectImage(item.urls.regular) } key={ index } style={ backgroundColor }>
									<img style={ dimension } src={ item.urls.small } alt=""/>
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
		return (
			<div className="relative">
				<button
					onClick={ this.handleRemove }
					className="remove-btn">
					  <i className="fa fa-times"></i>
					</button>
				{ this.state.value === '' ? unsplashSelector() : unsplashImage() }
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
    updateValue: (index, value) => dispatch(updateValue(index, value))
  }
}

UnsplashGallery = connect(mapStateToProps, mapDispatchToProps)(UnsplashGallery)

export default UnsplashGallery
