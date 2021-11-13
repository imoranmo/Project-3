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
      instrument {
        instrument
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      userName
      email
    }
  }
`;

export const QUERY_RHYTHMS = gql`
  query rhythms {
    rhythms{
      _id
      rhythm
    }
  }
`;

export const QUERY_INSTRUMENTS= gql`
  query instruments {
    instruments{
      _id
      instrument
    }
  }
`;
