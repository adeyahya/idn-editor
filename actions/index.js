export const addContent = () => {
	return (dispatch) => {
		dispatch({ type: 'ADD_CONTENT' })
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