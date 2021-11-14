const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Rhythm {
    _id: ID
    name: String
  }

  type Instrument {
    _id: ID
    name: String
  }

  type Comment {
      _id: ID
      content: String
      user: User
      dateCreated: String
  }

  type Post {
    _id: ID
    user: User
    dateCreated: String
    title: String
    content: String
    rhythm: Rhythm
    comments: [Comment]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    userName: String
    email: String
    password: String
    instruments: [Instrument]
    bio: String
    rating: Int
    img: String

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
    user (userId: ID, userName: String): User
    users: [User]
    me: User
  }

  type Mutation {
    addUser(firstName: String, lastName: String, userName: String!, email: String!, password: String!) :Auth
    addPost(title: String, content: String, url: String, rhythm: ID, user: ID ): Post
    updatePost(title: String, content: String, url: String, rhythm: ID, user: ID, _id: ID): Post
    login (email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;