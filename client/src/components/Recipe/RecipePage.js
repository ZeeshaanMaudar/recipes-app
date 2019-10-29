import React from 'react';
import { withRouter } from 'react-router-dom';

import { Query } from 'react-apollo';
import { GET_RECIPE } from '../../queries';

import LikeRecipe from './LikeRecipe';


const callRecipe = ({ getRecipe }) => {
  const { name, category, description, instructions, username, likes } = getRecipe;

  return (
    <div className="App">
      <h2>{name}</h2>
      <p>Category: {category}</p>
      <p>Description: {description}</p>
      <p>Instructions: {instructions}</p>
      <p>Likes: {likes}</p>
      <p>Created By: {username}</p>
      <LikeRecipe />
    </div>
  );
};

const RecipePage = ({ match }) => {

  const { _id } = match.params;

  return (
    <Query query={GET_RECIPE} variables={{ _id }}>
      {({ data, loading, error }) => {
        if(loading) return <div>Loading...</div>;
        if(error) return <div>Error</div>;
        return callRecipe(data)
      }}
    </Query>
  );
};

export default withRouter(RecipePage);
