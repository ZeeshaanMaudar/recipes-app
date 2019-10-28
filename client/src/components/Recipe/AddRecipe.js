import React, { Component } from 'react';

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

  render() {
    const { name, category, description, instructions } = this.state;

    return (
      <div className="App">
        <h2 className="App">Add Recipe</h2>
        <form className="form">
          <input type="text" name="name" placeholder="Recipe Name" value={name} onChange={this.handleChange} />
          <select name="category" value={category} onChange={this.handleChange}>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">Snack</option>
          </select>
          <input type="text" name="description" placeholder="Add description" value={description} onChange={this.handleChange} />
          <textarea name="instructions" placeholder="Add instructions" value={instructions} onChange={this.handleChange} />
          <button type="submit" className="button-primary">Submit</button>
        </form>
      </div>
    )
  }
};

export default AddRecipe;
