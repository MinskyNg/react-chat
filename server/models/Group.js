/**
 * 群组数据
 */


var mongoose = require('mongoose');


var groupSchema = mongoose.Schema({
    name: { type: String, unique: true },
    signature: { type: String, default: '' },
    avatar: { type: String, default: 'http://7xnpxz.com1.z0.glb.clouddn.com/groupdefault.png' },
    msg: []
});


module.exports = mongoose.model('Group', groupSchema);
