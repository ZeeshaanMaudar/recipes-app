import React from 'react';

import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

import { GET_USER_RECIPES } from '../../queries';

const callRecipes = ({ _id, name, likes }) => (
  <li key={_id}>
    <Link to={`/recipes/${_id}`}>
      <p>{name}</p>
    </Link>
    <p>Likes: {likes}</p>
  </li>
);

const UserRecipes = ({ username }) => (
  <Query query={GET_USER_RECIPES} variables={{ username }}>
    {({ data, loading, error }) => {
      if(loading) return <div>Loading...</div>;
      if(error) return <div>Error</div>;
      console.log(333, data)
      const { getUserRecipes } = data;
      return (
        <ul>
          <h3>Your Recipes</h3>
          {getUserRecipes.map(callRecipes)}
        </ul>
      );
    }}
  </Query>
);

export default UserRecipes;
