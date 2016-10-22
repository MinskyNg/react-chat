/**
* 群组数据
**/


var mongoose = require('mongoose');


var groupSchema = mongoose.Schema({
    name: { type: String, unique: true },
    signature: { type: String, default: '' },
    avatar: { type: String, default: 'groupdefult' }
});


module.exports = mongoose.model('Group', groupSchema);
