import React from 'react';
import { connect } from 'react-redux';
import {
	addSection, getDraft
} from '../../actions';
import BasicEditor from '../components/BasicEditor';
import Title from '../components/Title';
import EmbedTwitter from '../components/EmbedTwitter';
import EmbedFacebook from '../components/EmbedFacebook';
import EmbedInstagram from '../components/EmbedInstagram';
import UnsplashGallery from '../components/UnsplashGallery';
import EmbedYoutube from '../components/EmbedYoutube';
import ImageGallery from '../components/ImageGallery';
import TextArea from '../components/TextArea';
import objectToFormData from 'object-to-formdata';

class Wrapper extends React.Component {
	constructor(props) {
    super(props);

    this.saveDraft = this._saveDraft.bind(this);
  }

  _addSection(value) {
    this.props.addSection(value);
  }

  componentDidMount() {
  	const self = this
  	import('superagent')
  		.then(request => {
  			request
  				.get('http://localhost:8080/api/article')
  				.accept('json')
  				.end((err, res) => {
  					if (err) {
  						return console.warn(err)
  					}
						self.props.getDraft(JSON.parse(res.text).data);
  				})
  		})
  }

  _saveDraft() {
  	const self = this;
  	// console.log(objectToFormData(self.props.data))
  	import('superagent')
  		.then(request => {
  			request
  				.post('http://localhost:8080/api/article')
  				.send({ data: self.props.data })
  				.end(function(err, res){
				    if (err || !res.ok) {
				      alert('Oh no! error');
				    } else {
				    	console.log(res.body)
				    }
				  });
  		})
  	localStorage.setItem('draft', JSON.stringify(this.props.data));
  }

	render() {
		return (
			<div className="container">
				<br/>
				{ this.props.data.map((item, index) => {
					switch( item.type ) {
						case 'content':
							return ( <BasicEditor value={ item.value } key={ index } id={ index }></BasicEditor> )

						case 'excerpt':
							return ( <TextArea value={ item.value } key={ index } id={ index }></TextArea> )

						case 'title':
							return ( <Title value={ item.value } type={ item.style } id={ index } key={ index }></Title> )

            case 'twitter':
              return ( <EmbedTwitter value={ item.value } key={ index } id={ index }></EmbedTwitter> )

            case 'facebook':
              return ( <EmbedFacebook value={ item.value } key={ index } id={ index }></EmbedFacebook> )

            case 'instagram':
              return ( <EmbedInstagram value={ item.value } key={ index } id={ index }></EmbedInstagram> )

           	case 'youtube':
              return ( <EmbedYoutube value={ item.value } key={ index } id={ index }></EmbedYoutube> )

            case 'image':
              return ( <ImageGallery value={ item.value } key={ index } id={ index }></ImageGallery> )
					}
				}) }
        <div className="text-center btn-group">
          <button onClick={ (e) => this._addSection({ type: 'content', value: '' }) }><i className="fa fa-paragraph"></i> add Paragraph</button>
          <button onClick={ (e) => this._addSection({ type: 'title', value: '', style: 'h2' }) }><i className="fa fa-header"></i> add Header</button>
          <button onClick={ (e) => this._addSection({ type: 'twitter', value: '' }) }><i className="fa fa-twitter"></i> Embed Twitter</button>
          <button onClick={ (e) => this._addSection({ type: 'facebook', value: '' }) }><i className="fa fa-facebook"></i> Embed Facebook</button>
          <button onClick={ (e) => this._addSection({ type: 'instagram', value: '' }) }><i className="fa fa-instagram"></i> Embed Instagram</button>
          <button onClick={ (e) => this._addSection({ type: 'youtube', value: '' }) }><i className="fa fa-youtube"></i> Embed Youtube</button>
          <button onClick={ (e) => this._addSection({ type: 'image', value: '', uploading: false, gallery: false }) }><i className="fa fa-camera"></i> Add Image</button>
        </div>

        <div className="navbar-bottom">
        	<div className="text-center btn-group">
						<button onClick={ this.saveDraft }>Save to Draft</button>
						<button onClick={ () => window.location.href = '/preview' }>Preview</button>
        	</div>
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
    addSection: (payload) => dispatch(addSection(payload)),
    getDraft: (payload) => dispatch(getDraft(payload))
  }
}

Wrapper = connect(mapStateToProps, mapDispatchToProps)(Wrapper)

export default Wrapper
