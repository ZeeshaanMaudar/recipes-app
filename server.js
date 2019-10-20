const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config({ path: 'variables.env' });

const Recipe = require('./models/Recipe');
const User = require('./models/User');

// Adding GraphQl - Express Middleware
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const { typeDefs } = require('./schema');
const { resolvers } =require('./resolvers');

// create schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// Connects to database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, })
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

// Initialises application
const app = express();

// Create GraphiQl Application
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Connect Schemas with GraphQl
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({
    schema,
    context: {
      Recipe,
      User
    }
  })
);

// setup the server
const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log(`server listening on PORT: ${PORT}`);
});
