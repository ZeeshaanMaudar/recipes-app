import React from 'react';
import { Query } from 'react-apollo';

import { GET_CURRENT_USER } from '../queries';

const withSession = Component => props => (
  <Query query={GET_CURRENT_USER}>
    {({ data, loading, refetch }) => {
      if(loading) return null;
      console.log(444, data)
      return (
        <Component {...props} {...{ refetch }} />
      );
    }}
  </Query>
);

export default withSession;
