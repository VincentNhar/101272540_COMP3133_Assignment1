const { gql } = require('apollo-server-express');

const typeDefs = gql `
    type User{
        id: ID!
        username: String!
        email: String!
    }
    
    type Employee{
        id: ID!
        first_name: String!
        last_name: String!
        email: String!
    }

    type Query {
        getEmployees: [Employee]
        getEmployeeById(eid: ID!): Employee
        login(username: String!, password: String!): Boolean
    }

    type Mutation {
        signup(username: String!, email: String!, password: String!): User!
        addNewEmployee(first_name: String!, last_name: String!, email: String!): Employee!
        updateEmployeeById(eid: ID!, first_name: String!, last_name: String!, email: String!): Employee!
        deleteEmployeeById(eid: ID!): Boolean
    }
`

module.exports = typeDefs;


