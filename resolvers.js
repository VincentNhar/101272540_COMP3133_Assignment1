const UserModel = require('./models/User')
const EmpModel = require('./models/Employee')

const resolvers = {
    Query: {
        login: async (_,{username,password}) => {
            const user = await UserModel.findOne({"username": username})
            
            if (user && user.password == password){
                return true;
            };
            return false;
        },
        getEmployees: async () => {
            const employees = await EmpModel.find();
            return employees;
        },
        getEmployeeById: async (_, {eid}) => {
            const employee = await EmpModel.findById(eid);
            
            return employee;
        }
    },
    Mutation: {
        signup: async (_, {username, email, password}) => {
            const user = new UserModel({username, email, password});
            await user.save();
            return user;
        },
        addNewEmployee: async (_, {first_name, last_name, email, gender, salary}) => {
            gender = gender.toLowerCase();
            const employee = new EmpModel({ first_name, last_name, email, gender, salary });
            await employee.save();
            return employee;
        },
        updateEmployeeById: async (_, {eid, first_name, last_name, email, gender, salary}) => {
            first_name = capitalFirstLetter(first_name)
            last_name = capitalFirstLetter(last_name)
            gender = capitalFirstLetter(gender)

            const updatedEmployee = await EmpModel.findByIdAndUpdate(eid,
                { 
                    first_name, 
                    last_name, 
                    email, 
                    gender, 
                    salary
                },
                { new: true }
            );

            return updatedEmployee;
        },
        deleteEmployeeById: async (_,{eid}) => {
            const deletedEmployee = await EmpModel.findByIdAndDelete(eid)
            if (deletedEmployee){
                return true;
            }
            return false
        }
    }
}

//helper function
function capitalFirstLetter(str){
    return str.replace(/\b\w/g, match => match.toUpperCase());
};

module.exports = resolvers;