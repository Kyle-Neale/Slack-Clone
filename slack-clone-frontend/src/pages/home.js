import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';


const GET_ALL_USERS = gql`
  {
    allUsers {
      id
      email
    }
  }
`;

const Home = () => {
  return (
    <Query query={GET_ALL_USERS}>
      {({ loading, error, data }) => {
        if (loading) {
          return <p>Loading...</p>;
          };
          if (error) {
            return <p>Error :(</p>;
            };
            return (
              <Fragment>
                {
                  data.allUsers.map(user => <h1 key={user.id}>{user.email}</h1>)
                }
              </Fragment>
            )
          }}
    </Query>
  )
};

export default Home
