import React from 'react'
import Unsplash from 'unsplash-js'

class ImageUploader extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			unsplash: false
		}
		this.handleFileInput = (e) => this._handleFileInput(e)
	}

	_handleFileInput(e) {
		console.log(e.target.files)
	}

	_handleUpload() {
		this.fileInput.click()
	}

	render() {
		const style = {
			fileinput: {
				display: 'none'
			},
			wrapper: {
		    background: 'whitesmoke',
		    position: 'relative',
		    textAlign: 'center',
		    padding: '100px 0',
		    marginBottom: '20px',
		    borderRadius: '5px',
		    marginTop: '20px'
			},
			bg: {
				backgroundColor: 'white'
			}
		}
		return (
			<div style={ style.wrapper } onClick={ () => this.setState({ unsplash: true}) }>
				<button 
          className="remove-btn">
            <i className="fa fa-times"></i>
          </button>
          image here
				<input 
					ref={ (input) => { this.fileInput = input } }
					onChange={ this.handleFileInput }
					type="file" 
					style={ style.fileinput }/>
			</div>
		)
	}
}

export default ImageUploader