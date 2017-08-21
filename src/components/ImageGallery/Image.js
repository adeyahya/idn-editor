import React from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import {
	updateValue,
	toggleGallery
} from '../../../actions';

class Image extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			files: [],
			value: '',
			title: '',
			source: '',
      height: 0
		};
		this.handleChange = this._handleChange.bind(this)
	}

	componentWillMount() {
    let parentWidth = this.props.parentWidth == 0 ? 800 : this.props.parentWidth
    let width = this.props.data[this.props.id].width / 100;
    let height = this.props.data[this.props.id].height / 100;
    let c = parentWidth / width
    let dimensionHeight = Math.round(c * height);

		this.setState({
			value: this.props.value,
      height: dimensionHeight
		})
	}

  componentDidMount() {
    this.setState({
      outerWidth: this.imageWrapper.clientWidth
    })
  }

	_handleChange() {
		this.props.updateValue(this.props.id, '')
		this.props.toggleGallery(this.props.id)
	}

	render() {
		let styles = {
      progress: {
        height: '4px',
        width: `${this.props.data[this.props.id].progressNumber}%`,
        backgroundColor: 'black'
      },
      dimension: {
        width: '100%',
        height: `${ this.state.height }px`,
        backgroundColor: 'black',
        display: 'inline-block',
        overflow: 'hidden'
      }
		}
		const changeButton = () => {
			 return (
			 	<button className="change-button" onClick={ this.handleChange }>
			 		<i className="fa fa-camera"></i> Change Image
			 	</button>
			)
		}
		return (
			<div ref={ (el) => { this.imageWrapper = el } }>
				{ this.props.data[this.props.id].uploading ? null : changeButton() }
				<figure style={ styles.dimension }>
					<img
            className={ this.props.data[this.props.id].uploading ? 'max grey' : 'max' }
            src={ this.props.data[this.props.id].value }
            alt=""/>
				</figure>
				{ this.props.data[this.props.id].uploading ? <div className="progress" style={ styles.progress }/> : null }
				{ this.props.data[this.props.id].uploading ?
					<p className="progress-number">Uploading <strong>{this.props.data[this.props.id].progressNumber}%</strong></p>
				: null }
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.draft.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  	updateValue: (index, value) => dispatch(updateValue(index, value)),
  	toggleGallery: index => dispatch(toggleGallery(index))
  }
}

Image = connect(mapStateToProps, mapDispatchToProps)(Image)

export default Image;
