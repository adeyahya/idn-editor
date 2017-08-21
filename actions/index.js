export const fetchDraft = require('./fetchDraft.js');
export const updateValue = require('./updateValue.js');
export const removeSection = require('./removeSection.js');
export const updateProgressUpload = require('./updateProgressUpload.js');
export const uploadImage = require('./uploadImage.js');
export const update = require('./update.js');

export const addContent = () => {
	return (dispatch) => {
		dispatch({ type: 'ADD_CONTENT' })
	}
}

export const setImageId = (index, imageId) => {
	return (dispatch) => {
		dispatch({ type: 'SET_IMAGE_ID', index: index, payload: imageId })
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

// export const updateValue = (i, payload) => {
// 	return (dispatch) => {
// 		dispatch({ type: 'UPDATE_VALUE', index: i, payload: payload })
// 	}
// }
