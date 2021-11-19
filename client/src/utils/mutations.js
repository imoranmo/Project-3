import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        userName
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($firstName: String, $lastName: String, $userName: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, userName: $userName, email: $email, password: $password) {
      token
      user {
        _id
        userName
      }
    }
  }
`;


export const UPDATE_USER = gql`
  mutation updateUser($firstName: String, $lastName: String, $userName: String, $email: String, $instruments: ID, $bio: String) {
    updateUser(firstName: $firstName, lastName: $lastName, userName: $userName, email: $email, instruments: $instruments, bio: $bio) {
        _id
        userName
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost($content: String, $title: String, $rhythm: ID, $url: String){
    addPost(content: $content, title: $title, rhythm: $rhythm, url:$url){
      _id
      title
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($content: String, $postId: ID) {
    addComment(content:$content, postId:$postId ){
      _id
      content
      dateCreated
      user {
          _id
          userName
        }
    }
  }`

export const UPDATE_POST = gql`
mutation updatePost($_id: ID, $content: String, $title: String, $rhythm: ID, $url: String, $user: ID ){
  updatePost(_id: $_id, content: $content, title: $title, rhythm: $rhythm, url:$url, user: $user){
    _id
    title
  }
}
`;

export const UPDATE_COMMENT = gql`
  mutation updateComment($_id:ID, $content: String, $postId:ID) {
    updateComment(_id:$_id, content:$content, postId:$postId){
      _id
    }
  }`

  
export const DELETE_POST = gql`
mutation deletePost($_id: ID) {
  deletePost(_id:$_id){
    _id
    title
  }
}`


export const DELETE_COMMENT = gql`
  mutation deleteComment($_id: ID, , $postId: ID) {
    deleteComment(_id:$_id, postId:$postId){
      _id
    }
  }`