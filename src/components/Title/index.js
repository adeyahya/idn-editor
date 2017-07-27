import React from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateValue } from '../../../actions'

class Title extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			placeholder: 'Title Here ...'
		}
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

	render() {
		const elType = (type) => {
			switch (type) {
				case 'h1':
					return (
						<h1 
							onKeyUp={ this._onChange.bind(this) } 
							ref={ (input) => this.header = input } 
							contentEditable="true" 
							onPaste={ (e) => this._strip(e) }
							placeholder={ this.state.placeholder }></h1>)

				case 'h2': {
					return ( <h2 onKeyUp={ this._onChange.bind(this) } ref={ (input) => this.header = input } contentEditable="true" placeholder={ this.state.placeholder }></h2> )
				}
			}
		}

		return (
			<header>
				{ elType(this.props.type) }
			</header>
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
    data: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateValue: (index, value) => dispatch(updateValue(index, value))
  }
}

Title = connect(mapStateToProps, mapDispatchToProps)(Title)

export default Title