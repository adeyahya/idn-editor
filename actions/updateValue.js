module.exports = (i, payload) => {
	return (dispatch) => {
		dispatch({ type: 'UPDATE_VALUE', index: i, payload: payload });
	}
}
