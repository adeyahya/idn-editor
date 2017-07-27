import update from 'react-addons-update'

const idneditor = (state = [
  { label: 'title', value: '', type: 'h1' },
  { label: 'content', value: '' },
  { label: 'image', value: '', link: '', caption: '' },
], action) => {
  switch (action.type) {
    case 'ADD_CONTENT':
      return [
        ...state,
        { label: 'content', value: '' }
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