const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql')

var customers = require('../data/customers')


var customerFieldOptions = {
  id : {
    type : GraphQLString
  },
  name : {
    type : GraphQLString
  },
  email : {
    type : GraphQLString
  },
  age : {
    type : GraphQLInt
  }
}

var customerTypeOptions = {
  name : "Customer",
  fields: () => (customerFieldOptions)
}

var CustomerType = new GraphQLObjectType(customerTypeOptions)

var rootQueryOptions = {
  name : "RootQueryType",
  fields : {
    customer : {
      type: CustomerType,
      args : {
        id : {
          type : GraphQLString
        }
      },
      resolve(parentValue, args){
        for (let i=0; i<customers.length; i++){
          if (customers[i].id == args.id){
            return customers[i]
          }
        }
      }
    },
    customers : {
      type : new GraphQLList(CustomerType),
      resolve(parentValue, args){
        return customers
      }
    }
  }
}


var rootQuery = new GraphQLObjectType(rootQueryOptions)

var graphQLSchemaOptions = {
  query : rootQuery
}

module.exports = new GraphQLSchema(graphQLSchemaOptions)