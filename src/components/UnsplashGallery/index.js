import React from 'react'
import Unsplash from 'unsplash-js'

class UnsplashGallery extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			photos: []
		}

		this.handleUpload = () => this._handleUpload()
		this.unsplash = new Unsplash({
		  applicationId: "72b04f0837ce459c84c147913b87247a647f53b8a59866493206c3f37d1cadf2",
		  secret: "6ecf1d14ea76fef2f4d6bf5bd7c5ed344ff7b7da0086e4ca620527015df50be9",
		  callbackUrl: "http://localhost:3000"
		});
		this.handleSearch = this._handleSearch.bind(this)
	}
	componentWillMount() {
		this.unsplash.photos.getRandomPhoto({ count: "60" })
		  .then(res => res.json())
		  .then(json => {
		    this.setState({
		    	photos: json
		    })
		  });
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

	render() {
		const style = {
			button: {
				display: 'none'
			}
		}
		return (
			<div className="unsplash-gallery">
				<div className="unsplash-gallery--form">
					<form onSubmit={ this.handleSearch }>
						<input type="text" ref={ (input) => { this.inputSearch = input } } placeholder="Search Photos on Unsplash"/>
						<button style={ style.button } type="submit">Search</button>
					</form>
				</div>
				<div className="unsplash-gallery--wrapper">
					{ this.state.photos.map((item, index) => {
						let backgroundColor = { backgroundColor: item.color}
						let dimension = item.height > item.width ? { width: '100%', height: 'auto' } : { width: 'auto', height: '105%' }
						return (
							<figure key={ index } style={ backgroundColor }>
								<img style={ dimension } src={ item.urls.small } alt=""/>
							</figure>
						)
					}) }
				</div>
			</div>
		)
	}
}

export default UnsplashGallery