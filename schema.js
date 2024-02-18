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
        gender: String!
        salary: Float
    }

    type Query {
        getEmployees: [Employee]
        getEmployeeById(eid: ID!): Employee
        login(username: String!, password: String!): Boolean
    }

    type Mutation {
        signup(username: String!, email: String!, password: String!): User!
        addNewEmployee(first_name: String!, last_name: String!, email: String!, gender: String!, salary: Float!): Employee!
        updateEmployeeById(eid: ID!, first_name: String!, last_name: String!, email: String!, gender: String!, salary: Float!): Employee!
        deleteEmployeeById(eid: ID!): Boolean
    }
`

module.exports = typeDefs;


