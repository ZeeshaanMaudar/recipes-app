import React, { Component } from 'react';

import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { ADD_RECIPE, GET_ALL_RECIPES, GET_USER_RECIPES } from '../../queries';
import Error from '../Error';
import withAuth from '../withAuth';

const initialState = {
  name: '',
  category: 'Breakfast',
  description: '',
  instructions: '',
  username: ''
};
class AddRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
  }

  componentDidMount() {
    const { username } = this.props.session.getCurrentUser;

    this.setState({ username });
  };

  handleChange = element => {
    const { name, value } = element.target;

    this.setState({ [name]: value });
  };

  clearState = () => {
    this.setState({ ...initialState })
  };

  validateForm = () => {
    const { name, category, description, instructions } = this.state;

    const isInvalid = !name || !category || !description || !instructions;

    return isInvalid;
  };

  handleSubmit = (event, addRecipe) => {
    event.preventDefault();
    addRecipe().then(({ data }) => {
      this.clearState();
      this.props.history.push('/');
    });
  };

  updateCache = (cache, { data: { addRecipe } }) => {
    const cachedData = cache.readQuery({ query: GET_ALL_RECIPES });
    const { getAllRecipes } = cachedData;

    cache.writeQuery({
      query: GET_ALL_RECIPES,
      data: {
        getAllRecipes: [addRecipe, ...getAllRecipes]
      }
    });
  }

  render() {
    const { name, category, description, instructions, username } = this.state;
    
    return (
      <Mutation
        mutation={ADD_RECIPE}
        variables={{ name, category, description, instructions, username }}
        refetchQueries={() => [
        { query: GET_USER_RECIPES, variables: { username } }
      ]}
        update={this.updateCache}
      >
        {(addRecipe, { data, loading, error }) => {
          return (
            <div className="App">
              <h2 className="App">Add Recipe</h2>
              <form className="form" onSubmit={event => this.handleSubmit(event, addRecipe)}>
                <input
                  type="text"
                  name="name"
                  placeholder="Recipe Name"
                  value={name}
                  onChange={this.handleChange}
                />
                <select name="category" value={category} onChange={this.handleChange}>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snack">Snack</option>
                </select>
                <input
                  type="text"
                  name="description"
                  placeholder="Add description"
                  value={description}
                  onChange={this.handleChange}
                />
                <textarea
                  name="instructions"
                  placeholder="Add instructions"
                  value={instructions}
                  onChange={this.handleChange}
                />
                <button type="submit" className="button-primary" disabled={loading || this.validateForm()}>Submit</button>
                {error && <Error {...{ error }} />}
              </form>
            </div>
          );
        }}
      </Mutation>
    );
  }
};

export default withAuth(session => session && session.getCurrentUser)(withRouter(AddRecipe));
