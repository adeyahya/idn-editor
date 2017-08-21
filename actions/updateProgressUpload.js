module.exports = (i, progressNumber) => {
	return (dispatch) => {
		dispatch({ type: 'UPDATE_PROGRESS', index: i, payload: progressNumber })
	}
}
