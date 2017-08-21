import request from 'superagent';

module.exports = (index, formData, source , endpoint = 'http://localhost:8080/api/image') => {
	return (dispatch) => {
		dispatch({ type: 'UPLOAD_IMAGE_START', index: index })
		dispatch({ type: 'UPDATE_VALUE', index: index, payload: source })
		request
			.post(endpoint)
			.send(formData)
			.on('progress', event => {
				dispatch({ type: 'UPDATE_PROGRESS', index: index, payload: event.percent })
			}).end(function(err, res) {
				if (err || !res.ok) {
					dispatch({ type: 'UPLOAD_IMAGE_REJECTED', index: index })
				} else {
					dispatch({ type: 'UPLOAD_IMAGE_RESOLVED', index: index, payload: res.body })
				}
			})
	}
}
