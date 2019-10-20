exports.typeDefs = `

type Recipe {
  name: String!
  category: String!
  description: String!
  instructions: String!
  createDate: String
  likes: Int
  username: String
}

type User {
  username: String! @unique
  password: String!
  email: String!
  joinDate: String
  favorite: [Recipe]
}

type Query {
  getAllRecipes: [Recipe]
}

`;
