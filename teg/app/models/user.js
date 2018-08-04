// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        email        : String,
        password     : String,
        username     : String,
        test         : String,
        currentweight  : Number,
        goalWeight     : Number,
        allergies      : {type: Array,enum: 'Seafood', 'Wheat'},
        location       : {type: String,enum : ['GYM','HOME','BOTH']},
        fitnessgoals   : {type: String,enum : ['TONE','BUILD MUSCLE','LOSE WEIGHT','IMPROVE FLEXIBILTY','CARDIO',"NUTRITION"]},
      },



    //,default: 'GYM'
    //,default:'NUTRITION'

    facebook         : {
        id           : String,
        token        : String,
        name         : String,
        email        : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
