import React from 'react'
import { connect } from 'react-redux'
import { updateValue, removeSection } from '../../../actions'

class TextArea extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			placeholder: 'Subtitle Here ...'
		}

		this.handleRemove = this._handleRemove.bind(this);
		this.handleKeyPress = this._handleKeyPress.bind(this);
	}

	componentDidMount() {
		this.header.innerHTML = this.props.data.value
	}

	componentWillMount() {
		const removable = () => {
  		if (typeof this.props.data.removable == 'undefined')
  			return true

  		return this.props.data.removable
  	}

		this.setState({
			removable: removable()
		})
	}

	_handleKeyPress(e) {
		if (e.target.innerHTML.length >= 70) {
			e.preventDefault()
		}
		// console.log(e.clipboardData.getData("text/plain"));
	}

	_onChange() {
		this.props.updateValue(this.props.id, this.header.innerHTML)
	}

	// Remove all styles or tag from clipboard when paste
	_strip(e) {
		e.preventDefault();
    let text = e.clipboardData.getData("text/plain");
    text = text.substring(0, 70);
    document.execCommand("insertHTML", false, text);
	}

	_handleRemove() {
		this.props.removeSection(this.props.id)
	}

	render() {
		const style = {
			position: 'relative',
			fontSize: '1.4rem'
		}

		return (
			<div>
				<header style={ style }>
					{ !this.state.removable ? null : <button onClick={ this.handleRemove }className="remove-btn"><i className="fa fa-times"></i></button> }
					<p
						onKeyUp={ this._onChange.bind(this) }
						onKeyPress={ this.handleKeyPress }
						ref={ (input) => this.header = input }
						contentEditable="true"
						style={ style }
						onPaste={ (e) => this._strip(e) }
						placeholder={ this.state.placeholder }></p>
				</header>
			</div>
		)
	}
}

TextArea.propTypes = {
	type: propTypes.string
}

TextArea.defaultProps = {
	type: 'h2'
}

const mapStateToProps = (state, ownProps) => {
  return {
    // data: state.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateValue: (index, value) => dispatch(updateValue(index, value)),
    removeSection: (index) => dispatch(removeSection(index))
  }
}

TextArea = connect(mapStateToProps, mapDispatchToProps)(TextArea)

export default TextArea
