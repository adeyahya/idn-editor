import React from 'react'

class EmbedTwitter extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			html: ''
		}
	}

	render() {
		return (
			<div>
				<p contentEditable="true" placeholder="Twitter url here"></p>
			</div>			
		)
	}
}

export default EmbedTwitter