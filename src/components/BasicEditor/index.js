import React from 'react';
import { connect } from 'react-redux';
import { removeSection, updateValue } from '../../../actions';
import {
  Editor,
  EditorState,
  ContentState,
  Entity,
  RichUtils,
  convertToRaw,
  CompositeDecorator,
  Modifier
} from 'draft-js';
import {stateToHTML } from 'draft-js-export-html';
import request from 'superagent';

import Link from './Link';
import EntityControls from './EntityControls';
import InlineStyleControls from './InlineStyleControls';
import BlockStyleControls from './BlockStyleControls';
import findEntities from './utils/findEntities';
import htmlToContent from './utils/htmlToContent';

class BasicEditor extends React.Component {
  constructor(props) {
    super(props);
    let { value } = props;

    const decorator = new CompositeDecorator([
      {
        strategy: findEntities.bind(null, 'link'),
        component: Link
      }
    ]);

    this.INLINE_STYLES = [
      {icon: 'fa fa-bold', style: 'BOLD'},
      {icon: 'fa fa-italic', style: 'ITALIC'},
      {icon: 'fa fa-underline', style: 'UNDERLINE'},
      // {label: 'Monospace', style: 'CODE'},
      {icon: 'fa fa-strikethrough', style: 'STRIKETHROUGH'},
    ];

    this.BLOCK_TYPES = [
      {label: 'nostyle', style: 'unstyled'},
      // {label: 'H1', style: 'header-one'},
      // {label: 'H2', style: 'header-two'},
      {icon: 'fa fa-quote-left', style: 'blockquote'},
      {icon: 'fa fa-list-ul', style: 'unordered-list-item'},
      {icon: 'fa fa-list-ol', style: 'ordered-list-item'},
      // {icon: 'fa fa-code', style: 'code-block'}
    ];

    this.state = {
      editorState: value != '' ?
        EditorState.createWithContent(
          ContentState.createFromBlockArray(htmlToContent(this.props.data.value)),
          decorator
        ) :
        EditorState.createEmpty(decorator)
    };

    // this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => {
      let previousContent = this.state.editorState.getCurrentContent();
      this.setState({editorState});
      this._extractHTML(editorState)
    };


    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    this.handleReturn = (e) => this._handleReturn(e);
    this.handleRemove = this._handleRemove.bind(this)
  }

  componentWillMount() {
  	if (!localStorage.getItem('dictionary')) {
  		request
	  		.get('/dictionary.txt')
	  		.set('Content-Type', 'plain/text')
	  		.then(res => {
	  			localStorage.setItem('dictionary', res.text);
	  			this.setState({
	  				dictionary: localStorage.getItem('dictionary')
	  			})
	  		}).catch((err) => {
	  			console.warn(err.message);
	  		})
  	}

  	const removable = () => {
  		if (typeof this.props.data.removable == 'undefined')
  			return true

  		return this.props.data.removable
  	}

	  this.setState({
			dictionary: localStorage.getItem('dictionary'),
			removable: removable()
		})
  }

  _handleKeyCommand(command) {
    const {editorState} = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _handleReturn(e) {
    if (e.metaKey === true) {
      return this._addLineBreak();
    } else {
      return false;
    }
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

  _addLineBreak(/* e */) {
    let newContent, newEditorState;
    const {editorState} = this.state;
    const content = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const block = content.getBlockForKey(selection.getStartKey());

    // console.log(content.toJS(), selection.toJS(), block.toJS());

    if (block.type === 'code-block') {
      newContent = Modifier.insertText(content, selection, '\n');
      newEditorState = EditorState.push(editorState, newContent, 'add-new-line');
      this.onChange(newEditorState);
      return true;
    } else {
      return false;
    }
  }

  _addLink(/* e */) {
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    if (selection.isCollapsed()) {
      return;
    }
    const href = window.prompt('Enter a URL');
    const entityKey = Entity.create('link', 'MUTABLE', {href});
    this.onChange(RichUtils.toggleLink(editorState, selection, entityKey));
  }

  _removeLink(/* e */) {
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    if (selection.isCollapsed()) {
      return;
    }
    this.onChange( RichUtils.toggleLink(editorState, selection, null));
  }

  _extractHTML(es) {
  	let self = this;
    let html = es.getCurrentContent();
		html = stateToHTML(html);
		self.props.updateValue(self.props.id, html);
  }

  _handleRemove() {
    this.props.removeSection(this.props.id)
  }

  render() {
    const {editorState} = this.state;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    let style = {
      position: 'relative'
    }


    return (
      <div style={ style } ref={ (el) => { this.basicEditor = el } }>
				{ !this.state.removable ? null : <button onClick={ this.handleRemove }className="remove-btn"><i className="fa fa-times"></i></button> }
        <div className="RichEditor-root draftjs-bhe">
          <BlockStyleControls
            editorState={editorState}
            blockTypes={this.BLOCK_TYPES}
            onToggle={this.toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
            inlineStyles={this.INLINE_STYLES}
          />
          <div className={className} /* onClick={this.focus} */>
            <Editor
              blockStyleFn={getBlockStyle}
              customStyleMap={styleMap}
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              handleReturn={this.handleReturn}
              onChange={this.onChange}
              stripPastedStyles={true}
              placeholder="Tell a story..."
              ref="editor"
              spellCheck={false}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    // data: state.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeSection: index => dispatch(removeSection(index)),
    updateValue: (index, value) => dispatch(updateValue(index, value)),
  }
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontSize: 16,
    padding: 2
  }
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}

BasicEditor = connect(mapStateToProps, mapDispatchToProps)(BasicEditor)

export default BasicEditor
