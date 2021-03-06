import React from 'react';
import { Mutation, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';

import LoginForm from '../components/LoginForm.js';

export const LOGIN_USER = gql`
  mutation($email: String!, $password: String!){
    loginUser(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors{
        path
        message
      }
    }
  }
`;

export default function Login(props) {
  return (
    <ApolloConsumer>
      {client => (
        <Mutation mutation={LOGIN_USER}>
          {
            (loginUser, { loading, error }) => {
            return <LoginForm {...props} loginUser={loginUser} />;
          }
        }
        </Mutation>
      )}
    </ApolloConsumer>
  );
}
