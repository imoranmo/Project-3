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

export const QUERY_POSTS= gql`
  query posts {
    posts{
      _id
      user {
        userName
        _id
        instruments {_id}
      }
      dateCreated
      title
      content
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
