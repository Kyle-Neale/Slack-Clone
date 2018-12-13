import React from 'react';
import { Mutation, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';

import RegisterForm from '../components/Register-Form.js';

export const REGISTER_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    registerUser(username: $username, email: $email, password: $password)
  }
`;

export default function Login() {
  return (
    <ApolloConsumer>
      {client => (
        <Mutation mutation={REGISTER_USER}>
          {(registerUser, { loading, error }) => {
            return <RegisterForm registerUser={registerUser} />;
          }
        }
        </Mutation>
      )}
    </ApolloConsumer>
  );
}
