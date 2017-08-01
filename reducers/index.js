import update from 'react-addons-update'

const idneditor = (state = {
  data: [
    { type: 'unsplash', value: 'https://images.unsplash.com/photo-1494603976222-89db76b28a3f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=6faf680fdfbcf6a1abca656f0a3ece0d' },
    { type: 'title', value: '', style: 'h1' },
    { type: 'content', value: '' },
  ]
}, action) => {
  switch (action.type) {
    case 'ADD_SECTION': {
      return Object.assign({}, state, {
        data: state.data.concat(action.payload)
      })
    }
    case 'UPDATE_VALUE': {
      return update(state, {
        data: {
          [action.index]: {
            value: {$set: action.payload}
          }
        }
      })
    }
    case 'REMOVE_SECTION': {
      return Object.assign({}, state, {
        data: state.data.slice(0, action.index).concat(state.data.slice(action.index + 1))
      })
    }
    default: {
      return state
    }
  }
}

export default idneditor