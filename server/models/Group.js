var mongoose = require('mongoose');


var groupSchema = mongoose.Schema({
    name: { type: String, unique: true },
    signature: { type: String, default: '' },
    avatar: { type: String, default: 'TBdw!}|G%IH3~#uw' }
});


module.exports = mongoose.model('Group', groupSchema);
