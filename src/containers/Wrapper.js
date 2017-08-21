import React from 'react';
import { connect } from 'react-redux';
import {
	addSection, fetchDraft
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

import request from 'superagent';

class Wrapper extends React.Component {
	constructor(props) {
    super(props);

    this.saveDraft = this._saveDraft.bind(this);
  }

  _addSection(value) {
    this.props.addSection(value);
  }

  componentDidMount() {
  	this.props.fetchDraft('http://localhost:8080/api/article/5991e2425b6ac31e2b2a4215')
  }

  _saveDraft() {
  	const self = this;

  	// disable button
  	this.saveDraftButton.setAttribute('disabled', true);
  	this.saveDraftButton.innerHTML = 'Saving ...';

  	request
			.put('http://localhost:8080/api/article/5991e2425b6ac31e2b2a4215')
			.send({
				draft: true,
				data: self.props.draft.data
			})
			.end(function(err, res){
		    if (err || !res.ok) {
		      alert('Oh no! error');
		    } else {
		    	// Reenable draft button
		    	self.saveDraftButton.setAttribute('disabled', false);
			  	self.saveDraftButton.innerHTML = 'Save to Draft';
		    }
		  });
  	localStorage.setItem('draft', JSON.stringify(this.props.data));
  }

	render() {
		const buildDraft = () => {
			return (
				<div>
					{ this.props.draft.data.map((item, index) => {
						switch( item.type ) {
							case 'content':
								return ( <BasicEditor data={ item } key={ index } id={ index }></BasicEditor> )

							case 'excerpt':
								return ( <TextArea data={ item } key={ index } id={ index }></TextArea> )

							case 'title':
								return ( <Title data={ item } key={ index } id={ index } type={ item.style }></Title> )

	            case 'twitter':
	              return ( <EmbedTwitter data={ item } key={ index } id={ index }></EmbedTwitter> )

	            case 'facebook':
	              return ( <EmbedFacebook data={ item } key={ index } id={ index }></EmbedFacebook> )

	            case 'instagram':
	              return ( <EmbedInstagram data={ item } key={ index } id={ index }></EmbedInstagram> )

	           	case 'youtube':
	              return ( <EmbedYoutube data={ item } key={ index } id={ index }></EmbedYoutube> )

	            case 'image':
	              return ( <ImageGallery data={ item } key={ index } id={ index }></ImageGallery> )
						}
					}) }
				</div>
			)
		}
		return (
			<div className="container">
				<br/>

				{ this.props.draft.isLoading ? <p>Loading data</p> : buildDraft() }

        <div className="text-center btn-group">
          <button onClick={ (e) => this._addSection({ type: 'content', value: '' }) }><i className="fa fa-paragraph"></i> add Paragraph</button>
          <button onClick={ (e) => this._addSection({ type: 'title', value: '', style: 'h2' }) }><i className="fa fa-header"></i> add Header</button>
          <button onClick={ (e) => this._addSection({ type: 'twitter', value: '' }) }><i className="fa fa-twitter"></i> Embed Twitter</button>
          <button onClick={ (e) => this._addSection({ type: 'facebook', value: '' }) }><i className="fa fa-facebook"></i> Embed Facebook</button>
          <button onClick={ (e) => this._addSection({ type: 'instagram', value: '' }) }><i className="fa fa-instagram"></i> Embed Instagram</button>
          <button onClick={ (e) => this._addSection({ type: 'youtube', value: '' }) }><i className="fa fa-youtube"></i> Embed Youtube</button>
          <button onClick={ (e) => this._addSection({ type: 'image', value: '', uploading: false, gallery: false, multipleupload: false }) }><i className="fa fa-camera"></i> Add Image</button>
        </div>

        <div className="navbar-bottom">
        	<div className="text-center btn-group">
						<button ref={ (el) => { this.saveDraftButton = el } } onClick={ this.saveDraft }>Save to Draft</button>
        	</div>
        </div>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
  return {
    draft: state.draft
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addSection: (payload) => dispatch(addSection(payload)),
    fetchDraft: (url) => dispatch(fetchDraft(url))
  }
}

Wrapper = connect(mapStateToProps, mapDispatchToProps)(Wrapper)

export default Wrapper
