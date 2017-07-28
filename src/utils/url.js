module.exports = {
	crack: function(url) {
		var regex = /(youtube.com|youtu.be|facebook.com|fb.com|twitter.com|instagram.com|t.co)/
		var regtype = /(videos|comment_id)/

		if (regex.exec(url) !== null) return {
			host: regex.exec(url)[0],
			type: regtype.exec(url) ? regtype.exec(url)[0] : null
		}

		return false
	},

	// get youtube videoid from url given,
	// videoid length must be 11 or it asume as an error
	youtubeId: function(url) {
		var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/
    var match = url.match(regExp)
    return ( match && match[7].length==11 ) ? match[7] : false
	},
}