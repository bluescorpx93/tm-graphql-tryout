const axios = require("axios")

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql')

// var customers = require('../data/customers')


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
  },
  shopId : {
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
        // for (let i=0; i<customers.length; i++){
        //   if (customers[i].id == args.id){
        //     return customers[i]
        //   }
        // }
        return axios.get("http://localhost:3000/customers/" + args.id).then(res => res.data)

      }
    },
    customers : {
      type : new GraphQLList(CustomerType),
      resolve(parentValue, args){
        return axios.get("http://localhost:3000/customers").then(res => res.data)
      }
    }
  }
}

var rootQuery = new GraphQLObjectType(rootQueryOptions)

const customerMutationOptions = {
  name : "Mutation",
  fields: {
    addCustomer : {
      type : CustomerType,
      args : {
        name : { type : new GraphQLNonNull(GraphQLString) },
        email : { type : new GraphQLNonNull(GraphQLString) } ,
        age : { type : new GraphQLNonNull(GraphQLInt) },
        shopId : { type : new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parentValue, args){
        return axios.post("http://localhost:3000/customers", {
          name : args.name,
          email : args.email,
          age : args.age,
          shopId : args.shopId
        }).then(res => res.data)
      }
    },

    editCustomer : {
      type : CustomerType,
      args : {
        id : { type : new GraphQLNonNull(GraphQLInt)},
        name : { type : new GraphQLNonNull(GraphQLString) },
        email : { type : new GraphQLNonNull(GraphQLString) } ,
        age : { type : new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parentValue, args){
        return axios.put("http://localhost:3000/customers/" + args.id, {
          name : args.name,
          email : args.email,
          age : args.age,
        }).then(res => res.data)
      }
    },

    deleteCustomer : {
      type : CustomerType,
      args : {
        id : { type : new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parentValue, args){
        return axios.delete("http://localhost:3000/customers/" + args.id).then(res => res.data)
      }
    },

  }
}

const mutation = new GraphQLObjectType(customerMutationOptions)

var graphQLSchemaOptions = {
  query : rootQuery,
  mutation : mutation
}


module.exports = new GraphQLSchema(graphQLSchemaOptions)
