module.exports = (i) => {
	return (dispatch) => {
		dispatch({ type: 'REMOVE_SECTION', index: i });
	}
}
