import update from 'react-addons-update'

const stateInit = {
	isLoading: false,
	isError: false,
	data: []
}

export default function reducer(state= stateInit, action) {
	switch(action.type) {
		case 'FETCH_DRAFT_START': {
			return (update, {
				isLoading: true,
				isError: false
			})
		}

		case 'FETCH_DRAFT_RESOLVED': {
			return (update, {
				isLoading: false,
				isError: false,
				data: action.payload
			})
		}

		case 'FETCH_DRAFT_REJECTED': {
			return (update, {
				isLoading: false,
				isError: true
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

    // for image upload here
    case 'UPLOAD_IMAGE_START': {
    	return update(state, {
    		data: {
    			[action.index]: {
    				uploading: {$set: true}
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

    case 'UPLOAD_IMAGE_RESOLVED': {
    	return update(state, {
    		data: {
    			[action.index]: {
    				uploading: {$set: false},
    				uploadError: {$set: true},
    				value: {$set: `uploads/${ action.payload.filename }`}
    			}
    		}
    	})
    }

    case 'UPLOAD_IMAGE_REJECTED': {
    	return update(state, {
    		data: {
    			[action.index]: {
    				uploading: {$set: false},
    				uploadError: {$set: true},
    				value: {$set: ''}
    			}
    		}
    	})
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

    case 'TOGGLE_MULTIPLE_UPLOAD': {
  		return update(state, {
        data: {
          [action.index]: {
            multipleupload: {$set: !state.data[action.index].multipleupload}
          }
        }
      })
  	}

  	// section
  	case 'UPDATE_VALUE': {
      return update(state, {
        data: {
          [action.index]: {
            value: {$set: action.payload}
          }
        }
      })
    }

    case 'ADD_SECTION': {
      return Object.assign({}, state, {
        data: state.data.concat(action.payload)
      })
    }

		default: {
			return state
		}
	}
}
