module.exports = (i, payload) => {
  return (dispatch) => {
    dispatch({ type: 'UPDATE_SECTION', index: i, payload: payload });
  }
}
