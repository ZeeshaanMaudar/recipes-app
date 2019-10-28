import React, { Component } from 'react';

import { ApolloConsumer } from 'react-apollo';

import { SEARCH_RECIPES } from '../../queries';
import SearchItem from './SearchItem';

const callSearchRecipes = ({ _id, name, likes }) => (
  <SearchItem key={_id} {...{ _id, name, likes }} />
);

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: []
    }
  }

  handleChange = ({ searchRecipes }) => {
    this.setState({ searchResults: searchRecipes });
  }

  render() {
    const { searchResults } = this.state;
    return (
      <ApolloConsumer>
        {client => {
          return (
            <div className="App">
              <input
                type="search"
                placeholder="Search for Recipes"
                onChange={async event => {
                  event.persist();
                  const searchedData = await client.query({
                    query: SEARCH_RECIPES,
                    variables: { searchTerm: event.target.value}
                  });
                  const { data } = searchedData;
                  this.handleChange(data);
                }}
              />
              <ul>
                {searchResults.map(callSearchRecipes)}
              </ul>
            </div>
          );
        }}
      </ApolloConsumer>
    );
  }
};

export default Search;
