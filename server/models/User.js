/**
* 用户数据
**/


var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');


var UserSchema = mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    signature: { type: String, default: '' },
    avatar: { type: String, default: 'http://7xnpxz.com1.z0.glb.clouddn.com/userdefault.png' },
    date: String
});

UserSchema.statics.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};


UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
