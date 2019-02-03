import React from 'react';
import { Mutation, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';

import TeamForm from '../components/TeamForm.js';

export const CREATE_TEAM = gql`
  mutation($name: String!){
    createTeam(name: $name) {
      ok
      errors{
        path
        message
      }
    }
  }
`;

export default function Team(props) {
  return (
    <ApolloConsumer>
      {client => (
        <Mutation mutation={CREATE_TEAM}>
          {
            (createTeam, { loading, error }) => {
            return <TeamForm {...props} loginUser={CREATE_TEAM} />;
          }
        }
        </Mutation>
      )}
    </ApolloConsumer>
  );
}
