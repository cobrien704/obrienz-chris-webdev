module.exports = function() {
    var mongoose = require("mongoose");
    mongoose.Promise = require('q').Promise;

    var UserSchema = require("./user.schema.server")();
    var UserModel  = mongoose.model("UserModel", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByGoogleId: findUserByGoogleId
    };

    return api;

    function createUser(user) {
        return UserModel.create(user);
    }

    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function findUserByUsername(username) {
        return UserModel.findOne({ username: username });
    }

    function findUserByCredentials(username, password) {
        return UserModel.findOne({ username: username, password: password });
    }

    function updateUser(userId, user) {
        return UserModel.findOneAndUpdate({ _id: userId }, { $set: user })
    }

    function deleteUser(userId) {
        return UserModel.remove({ _id: userId });
    }

    function findUserByGoogleId(googleId) {
        return UserModel.findOne({'google.id': googleId});
    }
};