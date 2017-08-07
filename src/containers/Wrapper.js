import React from 'react';
import { connect } from 'react-redux';
import { addSection } from '../../actions';
import BasicEditor from '../components/BasicEditor';
import ImageUploader from '../components/ImageUploader';
import Title from '../components/Title';
import EmbedTwitter from '../components/EmbedTwitter';
import EmbedFacebook from '../components/EmbedFacebook';
import EmbedInstagram from '../components/EmbedInstagram';
import UnsplashGallery from '../components/UnsplashGallery';
import EmbedYoutube from '../components/EmbedYoutube';

class Wrapper extends React.Component {
	constructor(props) {
    super(props);
  }

  _addSection(value) {
    this.props.addSection(value)
  }

	render() {
		return (
			<div className="container">
				<br/>
				{ this.props.data.map((item, index) => {
					switch( item.type ) {
						case 'content':
							return ( <BasicEditor value={ item.value } key={ index } id={ index }></BasicEditor> )

						case 'title':
							return ( <Title value={ item.value } type={ item.style } id={ index } key={ index }></Title> )

            case 'image':
              return ( <ImageUploader value={ item.value } key={ index } id={ index }></ImageUploader> )

            case 'twitter':
              return ( <EmbedTwitter value={ item.value } key={ index } id={ index }></EmbedTwitter> )

            case 'facebook':
              return ( <EmbedFacebook value={ item.value } key={ index } id={ index }></EmbedFacebook> )

            case 'instagram':
              return ( <EmbedInstagram value={ item.value } key={ index } id={ index }></EmbedInstagram> )

            case 'unsplash':
              return ( <UnsplashGallery value={ item.value } key={ index } id={ index }></UnsplashGallery> )

           	case 'youtube':
              return ( <EmbedYoutube value={ item.value } key={ index } id={ index }></EmbedYoutube> )
					}
				}) }
        <div className="text-center btn-group">
          <button onClick={ (e) => this._addSection({ type: 'content', value: '' }) }><i className="fa fa-paragraph"></i> add Paragraph</button>
          <button onClick={ (e) => this._addSection({ type: 'title', value: '', style: 'h2' }) }><i className="fa fa-header"></i> add Header</button>
          <button onClick={ (e) => this._addSection({ type: 'twitter', value: '' }) }><i className="fa fa-twitter"></i> Embed Twitter</button>
          <button onClick={ (e) => this._addSection({ type: 'facebook', value: '' }) }><i className="fa fa-facebook"></i> Embed Facebook</button>
          <button onClick={ (e) => this._addSection({ type: 'instagram', value: '' }) }><i className="fa fa-instagram"></i> Embed Instagram</button>
          <button onClick={ (e) => this._addSection({ type: 'youtube', value: '' }) }><i className="fa fa-youtube"></i> Embed Youtube</button>
          <button onClick={ (e) => this._addSection({ type: 'unsplash', value: '' }) }><i className="fa fa-camera"></i> Unsplash</button>
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
    addSection: (payload) => dispatch(addSection(payload))
  }
}

Wrapper = connect(mapStateToProps, mapDispatchToProps)(Wrapper)

export default Wrapper
