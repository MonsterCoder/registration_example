var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  email : { 
    type: { type: String, trim: true}, 
    trim: true, 
    required: true, 
    index: { unique: true, uniqueCaseInsensitive: true },
    validate: {
      validator: (v) ->
        p =/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i
        p.test(v);
      ,
      message: '{VALUE} is not a valid email address!'
    }},
    created_at: { type: Date, default: Date.now },
  }
)

module.exports = mongoose.model('User', userSchema);
