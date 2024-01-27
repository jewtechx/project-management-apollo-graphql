const express = require("express")
const colors = require("colors")
const cors = require("cors")
const {graphqlHTTP} = require("express-graphql")

const schema = require("./schema/schema")
const connectDB = require("./config/db")

require("dotenv").config()
const port = process.env.PORT || 5000

const app = express()

// use cors
app.use(cors())


// connect to database
connectDB()

// graphql endpoint
app.use("/graphql" , graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV == "development",
}))

// Start server
app.listen(port , () => {
    console.log(`Server is running on port ${port}`)
})
