var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var postSchema = new Schema({
	'name' : String,
	'file' : String,
	'userid' : {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	'datetime' : Date,
	'tags' : Array,
	'up_votes': [{
		type: Schema.Types.ObjectId,
		ref: 'user'
	}],
	'down_votes': [{
		type: Schema.Types.ObjectId,
		ref: 'user'
	}],
	reports: Number,
	'comments': [{
		type: String
	}]

});

module.exports = mongoose.model('post', postSchema);
