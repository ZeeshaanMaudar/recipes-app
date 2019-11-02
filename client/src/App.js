import React from 'react';
import './App.css';

import { Query } from 'react-apollo';
import { GET_ALL_RECIPES } from './queries';

import RecipeItem from './components/Recipe/RecipeItem';

const callAllRecipes = ({ _id, name, category }) => (
  <RecipeItem key={_id} {...{ _id, name, category }} />
);

const App = () => (
  <div className="App">
    <h1>Home</h1>
    <Query query={GET_ALL_RECIPES}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading</div>
        if(error) return <div>Error</div>
        const { getAllRecipes } = data;
        return (
          <ul>{getAllRecipes.map(callAllRecipes)}</ul>
        );
      }}
    </Query>
  </div>
);

export default App;
