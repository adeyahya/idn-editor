import React from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateValue, removeSection } from '../../../actions'

class Title extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			placeholder: 'Title Here ...'
		}

		this.handleRemove = this._handleRemove.bind(this)
	}

	componentDidMount() {
		this.header.innerHTML = this.props.value
	}

	_onChange() {
		this.props.updateValue(this.props.id, this.header.innerHTML)
	}

	// Remove all styles or tag from clipboard when paste
	_strip(e) {
		e.preventDefault();
    var text = e.clipboardData.getData("text/plain");
    document.execCommand("insertHTML", false, text);
	}

	_handleRemove() {
		this.props.removeSection(this.props.id)
	}

	render() {
		const style = {
			position: 'relative',
	    // border: 'solid #dddddd 1px',
	    // padding: '0 10px'
		}
		const elType = (type) => {
			switch (type) {
				case 'h1':
					return (
						<h1 
							onKeyUp={ this._onChange.bind(this) } 
							ref={ (input) => this.header = input } 
							contentEditable="true"
							style={ style }
							onPaste={ (e) => this._strip(e) }
							placeholder={ this.state.placeholder }></h1>)

				case 'h2': {
					return ( 
						<h2 
							onKeyUp={ this._onChange.bind(this) }
							ref={ (input) => this.header = input }
							contentEditable="true"
							style={ style }
							onPaste={ (e) => this._strip(e) }
							placeholder={ this.state.placeholder }></h2>)
				}
			}
		}

		return (
			<div>
				<header style={ style }>
					{ this.props.type == 'h2' ? <button onClick={ this.handleRemove } className="remove-btn"><i className="fa fa-times"></i></button> : null }
					{ elType(this.props.type) }
				</header>
			</div>
		)
	}
}

Title.propTypes = {
	type: propTypes.string
}

Title.defaultProps = {
	type: 'h2'
}

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateValue: (index, value) => dispatch(updateValue(index, value)),
    removeSection: (index) => dispatch(removeSection(index))
  }
}

Title = connect(mapStateToProps, mapDispatchToProps)(Title)

export default Title