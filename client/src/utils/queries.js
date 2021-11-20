import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($userName: String!) {
    user(userName: $userName) {
      _id
      firstName
      lastName
      userName
      email
      bio
      img
      rating
      instruments {
        name
        _id
      }
    }
  }
`;

export const QUERY_RHYTHMS = gql`
  query rhythms {
    rhythms{
      _id
      name
    }
  }
`;

export const QUERY_INSTRUMENTS= gql`
  query instruments {
    instruments{
      _id
      name
    }
  }
`;

export const QUERY_POSTS = gql`
  query posts ($user: ID){
    posts(user: $user){
      _id
      user {
        userName
        _id
        instruments {_id}
      }
      dateCreated
      title
      content
      url
      rhythm {_id,name}
      comments {
        _id
        content
        dateCreated
        user {
          _id
          userName
        }
      }
    }
  }
`;

export const QUERY_POST= gql`
  query post ($postId:ID){
    post(postId:$postId){
      _id
      user {
        userName
        _id
        instruments {_id}
      }
      dateCreated
      title
      content
      url
      rhythm {_id,name}
      comments {
        _id
        content
        dateCreated
        user {
          _id
          userName
        }
      }
    }
  }
`;
