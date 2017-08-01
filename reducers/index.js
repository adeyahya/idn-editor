import update from 'react-addons-update'

const idneditor = (state = [
  { label: 'title', value: 'Node.js Emerging as the Universal Development Framework for a Diversity of Applications', type: 'h1' },
  { label: 'content', value: '' },
], action) => {
  switch (action.type) {
    case 'ADD_CONTENT':
      return [
        ...state,
        { label: 'content', value: '' }
      ]
    case 'ADD_SECTION':
      return [
        ...state,
        action.payload
      ]
    case 'ADD_TITLE':
      return [
        ...state,
        { label: 'title', value: '' }
      ]
    case 'ADD_IMAGE':
      return [
        ...state,
        { label: 'image', value: '', link: '', caption: '' }
      ]
    case 'UPDATE_VALUE': {
      return update(state, {
        [action.index]: {
          value: {$set: action.payload}
        }
      })
    }
    case 'REMOVE_SECTION':
      return state.slice(0, action.index).concat(state.slice(action.index + 1))
    default:
      return state
  }
}

export default idneditor