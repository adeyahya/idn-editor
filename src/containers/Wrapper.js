import React from 'react'
import { connect } from 'react-redux'
import { addContent, addTitle } from '../../actions'
import RichEditor from '../components/RichEditor'
import ImageUploader from '../components/ImageUploader'
import Title from '../components/Title'

class Wrapper extends React.Component {
	constructor(props) {
    super(props);

    const self = this
    
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

	render() {
		return (
			<div className="container">
				{ this.props.data.map((item, index) => {
					switch( item.label ) {
						case 'content':
							return ( <RichEditor key={ index } id={ index }></RichEditor> )

						case 'title':
							return ( <Title type={ item.type } id={ index } key={ index }></Title> )

            case 'image':
              return ( <ImageUploader key={ index } id={ index }></ImageUploader> )
					}
				}) }
				<button onClick={ this._addRich.bind(this) }>add rich</button>
				<button onClick={ this._addTitle.bind(this) }>add title</button>
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
    addTitle: () => dispatch(addTitle())
  }
}

Wrapper = connect(mapStateToProps, mapDispatchToProps)(Wrapper)

export default Wrapper