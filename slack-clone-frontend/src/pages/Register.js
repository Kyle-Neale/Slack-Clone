import React from 'react';
import { Mutation, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';

import RegisterForm from '../components/RegisterForm.js';

export const REGISTER_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    registerUser(username: $username, email: $email, password: $password) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default function Register(props) {

  return (
    <ApolloConsumer>
      {client => (
        <Mutation mutation={REGISTER_USER}>
          {(registerUser, { loading, error }) => {
            return <RegisterForm {...props} registerUser={registerUser} />;
          }
        }
        </Mutation>
      )}
    </ApolloConsumer>
  );
}
