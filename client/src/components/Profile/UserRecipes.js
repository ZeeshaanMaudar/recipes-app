import React from 'react';

import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';

import { GET_USER_RECIPES, DELETE_USER_RECIPE, GET_ALL_RECIPES, GET_CURRENT_USER } from '../../queries';

const handleDelete = deleteUserRecipe => {
  const confirmDelete = window.confirm('Are you sure you want to delete this recipe?');
  if(confirmDelete) {
    deleteUserRecipe().then(({ data }) => {
      // console.log(data);
    })
  }
}

const updateCache = username => (cache, { data }) => {
  const { getUserRecipes } = cache.readQuery({
    query: GET_USER_RECIPES,
    variables: { username }
  });

  const { deleteRecipe } = data;

  cache.writeQuery({
    query: GET_USER_RECIPES,
    variables: { username },
    data: {
      getUserRecipes: getUserRecipes.filter(recipe => recipe._id !== deleteRecipe._id)
    }
  })
};

const callRecipes = username => ({ _id, name, likes }) => (
  <li key={_id}>
    <Link to={`/recipes/${_id}`}>
      <p>{name}</p>
    </Link>
    <p style={{ marginBottom: 0 }}>Likes: {likes}</p>
    <Mutation
      mutation={DELETE_USER_RECIPE}
      variables={{ _id }}
      refetchQueries={() => [
        { query: GET_ALL_RECIPES },
        { query: GET_CURRENT_USER }
      ]}
      update={() => updateCache(username)}
    >
      {(deleteUserRecipe, attrs = {}) => {
        return (
          <p className="delete-button" onClick={() => handleDelete(deleteUserRecipe)}>
            {attrs.loading ? 'deleting...' : 'X'}
          </p>
        );
      }}
    </Mutation>
  </li>
);

const UserRecipes = ({ username }) => (
  <Query query={GET_USER_RECIPES} variables={{ username }}>
    {({ data, loading, error }) => {
      if(loading) return <div>Loading...</div>;
      if(error) return <div>Error</div>;
      const { getUserRecipes } = data;
      return (
        <ul>
          <h3>Your Recipes</h3>
          {!getUserRecipes.length && <p><strong>You haven't added any recipes yet!</strong></p>}
          {getUserRecipes.map(callRecipes(username))}
        </ul>
      );
    }}
  </Query>
);

export default UserRecipes;
