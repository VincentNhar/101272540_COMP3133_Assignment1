const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true,'Username is required'],
    unique: [true,'Username already exists']
  },
  email: {
    type: String,
    validate:{
        validator: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: props => `${props.value} is not a valid email address!`
    },
    required: [true, 'Email is required'],
    unique: [true, 'Email already exists']
  },
  password: {
    type: String,
    required: [true,'Password is required']
  },
});

const User = model('User', UserSchema);

module.exports = User;