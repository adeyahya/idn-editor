import React from 'react'
import { connect } from 'react-redux'
import { addContent, addTitle, addSection } from '../../actions'
import RichEditor from '../components/RichEditor'
import ImageUploader from '../components/ImageUploader'
import Title from '../components/Title'
import EmbedTwitter from '../components/EmbedTwitter'

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

  _addSection() {
    this.props.addSection({label: 'twitter', value: ''})
  }

	render() {
		return (
			<div className="container">
				{ this.props.data.map((item, index) => {
					switch( item.label ) {
						case 'content':
							return ( <RichEditor value={ item.value } key={ index } id={ index }></RichEditor> )

						case 'title':
							return ( <Title value={ item.value } type={ item.type } id={ index } key={ index }></Title> )

            case 'image':
              return ( <ImageUploader value={ item.value } key={ index } id={ index }></ImageUploader> )

            case 'twitter':
              return ( <EmbedTwitter value={ item.value } key={ index } id={ index }></EmbedTwitter> )
					}
				}) }
        <div className="text-center btn-group">
          <button onClick={ this._addRich.bind(this) }>add rich</button>
          <button onClick={ this._addTitle.bind(this) }>add title</button>
          <button onClick={ this._addSection.bind(this) }><i className="fa fa-twitter"></i> add Twitter</button>
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