export const addContent = () => {
	return (dispatch) => {
		dispatch({ type: 'ADD_CONTENT' })
	}
}

export const getDraft = (payload) => {
	return (dispatch) => {
		dispatch({ type: 'GET_DRAFT', payload: payload })
	}
}

export const setColor = (index, color) => {
	return (dispatch) => {
		dispatch({ type: 'SET_COLOR', index: index, color: color });
	}
}

export const toggleMultipleUpload = (i) => {
	return (dispatch) => {
		dispatch({ type: 'TOGGLE_MULTIPLE_UPLOAD', index: i })
	}
}

export const toggleGallery = (i) => {
	return (dispatch) => {
		dispatch({ type: 'TOGGLE_GALLERY', index: i })
	}
}

export const uploadStart = (i) => {
	return (dispatch) => {
		dispatch({ type: 'UPLOAD_START', index: i })
	}
}

export const uploadEnd = (i) => {
	return (dispatch) => {
		dispatch({ type: 'UPLOAD_END', index: i })
	}
}

export const updateProgress = (i, progressNumber) => {
	return (dispatch) => {
		dispatch({ type: 'UPDATE_PROGRESS', index: i, payload: progressNumber })
	}
}

export const addTitle = () => {
	return (dispatch) => {
		dispatch({ type: 'ADD_TITLE' })
	}
}

export const addImage = () => {
	return (dispatch) => {
		dispatch({ label: 'image', value: '', link: '', caption: '' })
	}
}

export const addSection = (payload) => {
	return (dispatch) => {
		dispatch({ type: 'ADD_SECTION', payload: payload})
	}
}

export const removeSection = (i) => {
	return (dispatch) => {
		dispatch({ type: 'REMOVE_SECTION', index: i })
	}
}

export const updateValue = (i, payload) => {
	return (dispatch) => {
		dispatch({ type: 'UPDATE_VALUE', index: i, payload: payload })
	}
}
