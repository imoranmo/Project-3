const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Rhythm {
    _id: ID
    rhythm: String
  }

  type Instrument {
    _id: ID
    instrument: String
  }

  type Comment {
      _id: ID
      content: String
      userId: ID
      dateCreated: String
  }

  type Post {
    _id: ID
    userId: ID
    createdDate: String
    title: String
    content: String
    rhythmId: ID
    comment: [Comment]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    userName: String
    email: String
    password: String
    post: [Post]
    instrument: [Instrument]
    bio: String
    rating: Int

  }

  
  type Auth {
    token: ID!
    user: User
  }


  type Query {
    rhythms: [Rhythm]
    instruments: [Instrument]
    post (postId: ID): Post
    posts: [Post]
    user (userId: ID): User
    users: [User]
  }

  type Mutation {
    addUser(firstName: String!, lastName: String, userName: String!, email: String!, password: String!) :Auth
    login (email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;