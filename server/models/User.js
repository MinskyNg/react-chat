/**
* 用户数据
**/


var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');


var UserSchema = mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    signature: { type: String, default: '' },
    avatar: { type: String, default: 'userdefault' },
    date: String
});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};


UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
