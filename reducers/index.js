import update from 'react-addons-update'

const idneditor = (state = {
  data: []
}, action) => {
  switch (action.type) {
  	case 'GET_DRAFT': {
  		return {
  			data: action.payload
  		}
  	}
  	case 'TOGGLE_GALLERY': {
  		return update(state, {
        data: {
          [action.index]: {
            gallery: {$set: !state.data[action.index].gallery}
          }
        }
      })
  	}
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

    case 'UPLOAD_START': {
    	return update(state, {
    		data: {
    			[action.index]: {
    				uploading: {$set: true},
    				progressNumber: {$set: 0}
    			}
    		}
    	})
    }

    case 'UPDATE_PROGRESS': {
    	return update(state, {
    		data: {
    			[action.index]: {
    				progressNumber: {$set: Math.round(action.payload)}
    			}
    		}
    	})
    }

    case 'UPLOAD_END': {
    	return update(state, {
    		data: {
    			[action.index]: {
    				uploading: {$set: false}
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
