import request from 'superagent';

module.exports = (url) => {
	return (dispatch) => {
		dispatch({ type: 'FETCH_DRAFT_START' });

		request
			.get(url)
			.end((err, res) => {
				if (err) {
					dispatch({ type: 'FETCH_DRAFT_REJECTED' })
				}
				// set image uploading and gallery
				let newData = []
				JSON.parse(res.text).data.map((item) => {
					switch(item.type) {
						case 'image': {
							newData.push(Object.assign(item, {
								uploading: false,
								gallery: false,
								multipleupload: false
							}))
							break;
						}
						default: {
							newData.push(item)
							break;
						}
					}
				})

				dispatch({ type: 'FETCH_DRAFT_RESOLVED', payload: newData })
			})
	}
}
