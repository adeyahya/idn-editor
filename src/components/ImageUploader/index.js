import React from 'react'

class ImageUploader extends React.Component {
	constructor(props) {
		super(props)

		this.handleFileInput = (e) => this._handleFileInput(e)
		this.handleUpload = () => this._handleUpload()
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
			}
		}
		return (
			<div style={ style.wrapper } onClick={ this.handleUpload }>
				<button 
          className="remove-btn">
            <i className="fa fa-times"></i>
          </button>
				upload image
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