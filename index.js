const express = require('express')
const expressGraphQL = require('express-graphql')
const graphQLApp = express()
var graphqlSchema = require('./schema/schema.js')

graphQLApp.get("/", (req, res) => {
  res.status(200).json({ msg : "Wow"})
})

var graphQLOptions = {
  schema : graphqlSchema,
  graphiql : true
}

graphQLApp.use("/graphql", expressGraphQL(graphQLOptions))

graphQLApp.listen(4000, () => {
  console.log("Server Started on 4000")
})