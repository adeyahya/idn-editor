import React from 'react';
import { connect } from 'react-redux';
import { updateValue, removeSection } from '../../../actions';

class Title extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			placeholder: 'Title Here ...'
		}

		this.handleRemove = this._handleRemove.bind(this);
		this.handleKeyPress = this._handleKeyPress.bind(this);
	}

	componentWillMount() {
		const removable = () => {
  		if (typeof this.props.data[this.props.id].removable == 'undefined')
  			return true

  		return this.props.data[this.props.id].removable
  	}

		this.setState({
			removable: removable()
		})
	}

	componentDidMount() {
		this.header.innerHTML = this.props.value
	}

	_handleKeyPress(e) {
		if (e.target.innerHTML.length >= this.props.maxCharacter) {
			e.preventDefault()
		}
	}

	_onChange() {
		this.props.updateValue(this.props.id, this.header.innerHTML)
	}

	// Remove all styles or tag from clipboard when paste
	_strip(e) {
		e.preventDefault();
    let text = e.clipboardData.getData("text/plain");
    text = text.substring(0, this.props.maxCharacter);
    document.execCommand("insertHTML", false, text);
	}

	_handleRemove() {
		this.props.removeSection(this.props.id)
	}

	render() {
		const style = {
			position: 'relative',
	    marginBottom: '5px',
	    marginTop: '10px',
	    fontWeight: '200'
		}

		const styles = {
			remaining: {
		    fontSize: '12px',
		    display: 'inherit',
		    marginBottom: '20px'
			}
		}

		const elType = (type) => {
			switch (type) {
				case 'h1':
					return (
						<h1
							onKeyUp={ this._onChange.bind(this) }
							onKeyPress={ this.handleKeyPress }
							ref={ (input) => this.header = input }
							className="single-line"
							contentEditable="true"
							style={ style }
							onPaste={ (e) => this._strip(e) }
							placeholder={ this.state.placeholder }></h1>)

				case 'h2': {
					return (
						<h2
							onKeyUp={ this._onChange.bind(this) }
							onKeyPress={ this.handleKeyPress }
							ref={ (input) => this.header = input }
							className="single-line"
							contentEditable="true"
							style={ style }
							onPaste={ (e) => this._strip(e) }
							placeholder={ this.state.placeholder }></h2>)
				}
			}
		}

		return (
			<div ref={ (el) => { this.Title = el } }>
				<header style={ style }>
					{ !this.state.removable ? null : <button onClick={ this.handleRemove }className="remove-btn"><i className="fa fa-times"></i></button> }
					{ elType(this.props.type) }
				</header>
				<span style={ styles.remaining }>{ (this.props.maxCharacter - this.props.data[this.props.id].value.length) } Remaining</span>
			</div>
		)
	}
}

Title.propTypes = {
	type: propTypes.string,
	maxCharacter: propTypes.number
}

Title.defaultProps = {
	type: 'h2',
	maxCharacter: 70
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
