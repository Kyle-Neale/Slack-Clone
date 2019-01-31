import React from 'react';
import { Mutation, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';

import LoginForm from '../components/Login-Form.js';

// export const Quer = gql`
//   mutation($username: String!, $email: String!, $password: String!) {
//     registerUser(username: $username, email: $email, password: $password) {
//       ok
//       errors {
//         path
//         message
//       }
//     }
//   }
// `;

export default function Login() {
  return (
    <ApolloConsumer>
      {client => (
        // <Mutation mutation={REGISTER_USER}>
          // {
            (registerUser, { loading, error }) => {
            return <LoginForm registerUser={registerUser} />;
          }
        // }
        // </Mutation>
      )}
    </ApolloConsumer>
  );
}
