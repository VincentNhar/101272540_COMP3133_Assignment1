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
    },
    gender: {
        type: String,
        required: [true,'Gender is required'],
        enum: {
            values: ["male","female","other"],
            message: 'Invalid gender value. Gender must be one of: Male, Female, Other'
        }
    },
    salary:{
        type: Number,
        min: [0, 'Salary must not be 0'],
        required: [true,'Salary is required']
    }
});

EmployeeSchema.pre('save', function (next){
    this.first_name = capitalFirstLetter(this.first_name)
    this.last_name = capitalFirstLetter(this.last_name)
    this.gender = capitalFirstLetter(this.gender)
    next();
});

function capitalFirstLetter(name){
    return name.replace(/\b\w/g, match => match.toUpperCase());
};


const Employee = model('Employee', EmployeeSchema);

module.exports = Employee;