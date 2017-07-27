import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom'
import { stateToHTML } from 'draft-js-export-html';
import { connect } from 'react-redux'
import { removeSection, updateValue } from '../../../actions'

import {
  Editor,
  EditorState,
  Entity,
  RichUtils,
  ContentState,
  CompositeDecorator,
  convertFromRaw, 
  convertToRaw,
  AtomicBlockUtils
} from 'draft-js';
import {
  getSelectionRange,
  getSelectedBlockElement,
  getSelectionCoords
} from './utils/selection';
import SideToolbar from './SideToolbar';
import InlineToolbar from './InlineToolbar';
import ImageComponent from './ImageComponent';

class RichEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
      inlineToolbar: { show: false },
      value: ''
    };

    this.onChange = (editorState) => {
      if (!editorState.getSelection().isCollapsed()) {
        const selectionRange = getSelectionRange();
        const selectionCoords = getSelectionCoords(selectionRange);
        this.setState({
          inlineToolbar: {
            show: true,
            position: {
              top: selectionCoords.offsetTop - (this.divElement.offsetTop - 80),
              left: selectionCoords.offsetLeft
            }
          }
        });
      } else {
        this.setState({ inlineToolbar: { show: false } });
      }

      this.setState({ editorState });
      this._extractHTML(editorState)
      this.props.updateValue(this.props.id, this.state.value)
      setTimeout(this.updateSelection, 0);
    }
    this.focus = () => this.refs.editor.focus();
    this.updateSelection = () => this._updateSelection();
    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    this._removeMe = this._removeMe.bind(this)
    this.blockRenderer = (block) => {
      if (block.getType() === 'atomic') {
        return {
          component: ImageComponent
        };
      }
      return null;
    }
    this.blockStyler = (block) => {
      if (block.getType() === 'unstyled') {
        return 'paragraph';
      }
      return null;
    }
  }

  _updateSelection() {
    const selectionRange = getSelectionRange();
    let selectedBlock;
    if (selectionRange) {
      selectedBlock = getSelectedBlockElement(selectionRange);
    }
    this.setState({
      selectedBlock,
      selectionRange
    });
  }

  _handleKeyCommand(command) {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  _extractHTML(es) {
    let html = es.getCurrentContent()
    html = stateToHTML(html);
    this.setState({
      value: html
    })
  }

  _removeMe() {
    let id = this.props.id
    let self = this
    setTimeout(function() { self.props.removeSection(id) }, 100)
  }
  render() {
    const { editorState, selectedBlock, selectionRange } = this.state;
    let sideToolbarOffsetTop = 0;

    if (selectedBlock) {
      // const editor = document.getElementById('richEditor');
      // const editorBounds = editor.getBoundingClientRect();
      // const blockBounds = selectedBlock.getBoundingClientRect();
      
      sideToolbarOffsetTop = this.divElement.clientHeight - 30 // height of side toolbar
    }
    let style = {
      padding: '0 20px'
    }
    return (
      <div ref={ (divElement) => this.divElement = divElement} style={ style } className="editor" id="richEditor" onClick={this.focus}> 
        <button 
          className="remove-btn" 
          onClick={ this._removeMe }>
            <i className="fa fa-times"></i>
          </button>
        {selectedBlock
          ? <SideToolbar
              editorState={editorState}
              style={{ top: sideToolbarOffsetTop }}
              onToggle={this.toggleBlockType}
              onUploadImage={this.handleUploadImage}
            />
          : null
        }
        {this.state.inlineToolbar.show
          ? <InlineToolbar
              editorState={editorState}
              onToggle={this.toggleInlineStyle}
              position={this.state.inlineToolbar.position}
            />
          : null
        }
        <Editor
          blockRendererFn={this.blockRenderer}
          blockStyleFn={this.blockStyler}
          editorState={editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
          placeholder="Write something..."
          spellCheck={true}
          readOnly={this.state.editingImage}
          ref="editor"
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    data: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeSection: index => dispatch(removeSection(index)),
    updateValue: (index, value) => dispatch(updateValue(index, value)),
  }
}

RichEditor = connect(mapStateToProps, mapDispatchToProps)(RichEditor)

export default RichEditor;