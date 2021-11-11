import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($userName: String!) {
    user(userName: $userName) {
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
