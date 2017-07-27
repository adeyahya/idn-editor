import React, { Component, PropTypes } from 'react';
import ToolbarIcon from './ToolbarIcon';

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { icon: 'fa fa-list-ul', style: 'unordered-list-item' },
  { icon: 'fa fa-list-ol', style: 'ordered-list-item' },
  { icon: 'fa fa-quote-left', style: 'blockquote' }
];

const SideToolbarExtras = ({ editorState, onToggle }) => {
  const self = this
  const selection = editorState.getSelection();
  const blockType = editorState.getCurrentContent()
                               .getBlockForKey(selection.getStartKey())
                               .getType();
  return (
    <div className="toolbar side">
      <ul className="toolbar-icons">
        {BLOCK_TYPES.map(type =>
          <ToolbarIcon
            key={type.label || type.icon}
            active={type.style === blockType}
            label={type.label}
            icon={type.icon}
            onToggle={onToggle}
            style={type.style}
          />
        )}
      </ul>
    </div>
  );
}

class SideToolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false
    };
  }

  render() {
    const { isExpanded } = this.state;
    const { editorState, onUploadImage, onToggle } = this.props;
    return (
      <div style={this.props.style} className="side-toolbar">
        <i className={ isExpanded ? "fa fa-times" : "fa fa-bars"}
           onClick={() => this.setState({ isExpanded: !this.state.isExpanded })}
           onMouseDown={(e) => e.preventDefault()}>
          {isExpanded
           ? <SideToolbarExtras editorState={editorState} onToggle={onToggle} />
           : null
          }
        </i>
      </div>
    )
  }
}

export default SideToolbar;
