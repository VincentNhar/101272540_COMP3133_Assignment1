const { Schema, model } = require('mongoose');

const EmployeeSchema = new Schema({
    first_name: {
        type: String,
        required: [true,'First name is required']
    },
    last_name: {
        type: String,
        required: [true,'Last name is required']
    },
    email: {
        type: String,
        validate:{
            validator: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            message: props => `${props.value} is not a valid email address!`
        },
        required: [true, 'Email is required'],
        unique: [true, 'Email already exists']
    }
});

EmployeeSchema.pre('save', function (next){
    this.first_name = capitalFirstLetter(this.first_name)
    this.last_name = capitalFirstLetter(this.last_name)
    next();
});

function capitalFirstLetter(name){
    return name.replace(/\b\w/g, match => match.toUpperCase());
};


const Employee = model('Employee', EmployeeSchema);

module.exports = Employee;