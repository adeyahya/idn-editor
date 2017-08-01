import React from 'react'
import { connect } from 'react-redux'
import { addContent, addTitle, addSection } from '../../actions'
import BasicEditor from '../components/BasicEditor'
import ImageUploader from '../components/ImageUploader'
import Title from '../components/Title'
import EmbedTwitter from '../components/EmbedTwitter'
import EmbedFacebook from '../components/EmbedFacebook'
import EmbedInstagram from '../components/EmbedInstagram'
import UnsplashGallery from '../components/UnsplashGallery'

class Wrapper extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    	data: [
    		{
    			label: 'title',
    			value: ''
    		},
    		{
    			label: 'content',
    			value: ''
    		}
    	]
    }
  }

  _addRich() {
  	this.props.addContent()
  }

  _addTitle() {
  	this.props.addTitle()
  }

  _addSection(value) {
    this.props.addSection(value)
  }

	render() {
		return (
			<div className="container">
        <UnsplashGallery></UnsplashGallery>
				{ this.props.data.map((item, index) => {
					switch( item.label ) {
						case 'content':
							return ( <BasicEditor value={ item.value } key={ index } id={ index }></BasicEditor> )

						case 'title':
							return ( <Title value={ item.value } type={ item.type } id={ index } key={ index }></Title> )

            case 'image':
              return ( <ImageUploader value={ item.value } key={ index } id={ index }></ImageUploader> )

            case 'twitter':
              return ( <EmbedTwitter value={ item.value } key={ index } id={ index }></EmbedTwitter> )

            case 'facebook':
              return ( <EmbedFacebook value={ item.value } key={ index } id={ index }></EmbedFacebook> )

            case 'instagram':
              return ( <EmbedInstagram value={ item.value } key={ index } id={ index }></EmbedInstagram> )
					}
				}) }
        <div className="text-center btn-group">
          <button onClick={ this._addRich.bind(this) }><i className="fa fa-paragraph"></i> add Paragraph</button>
          <button onClick={ this._addTitle.bind(this) }><i className="fa fa-header"></i> add Header</button>
          <button onClick={ (e) => this._addSection({ label: 'twitter', value: '' }) }><i className="fa fa-twitter"></i> Embed Twitter</button>
          <button onClick={ (e) => this._addSection({ label: 'facebook', value: '' }) }><i className="fa fa-facebook"></i> Embed Facebook</button>
          <button onClick={ (e) => this._addSection({ label: 'instagram', value: '' }) }><i className="fa fa-instagram"></i> Embed Instagram</button>
        </div>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
  return {
    data: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addContent: () => dispatch(addContent()),
    addTitle: () => dispatch(addTitle()),
    addSection: (payload) => dispatch(addSection(payload))
  }
}

Wrapper = connect(mapStateToProps, mapDispatchToProps)(Wrapper)

export default Wrapper