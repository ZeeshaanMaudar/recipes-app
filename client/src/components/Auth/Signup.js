import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { SIGNUP_USER } from '../../queries';
import Error from '../Error';

const initialState = {
  username: "",
  email: "",
  password: "",
  passwordConfirmation: ""
};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
  };

  clearState = () => {
    this.setState({ ...initialState })
  };

  handleChange = element => {
    const { name, value } = element.target;

    this.setState({ [name]: value });
  };

  handleSubmit = (event, signupUser) => {
    event.preventDefault();
    signupUser().then(async ({ data }) => {
      console.log(333, data)
      const { token } = data.signupUser;
      localStorage.setItem('token', token);
      await this.props.refetch();
      this.clearState();
      this.props.history.push('/');
    });
  };

  validateForm = () => {
    const { username, email, password, passwordConfirmation } = this.state;

    const isInvalid = !username || !email || !password || password !== passwordConfirmation;

    return isInvalid;
  };

  render() {
    const { username, email, password, passwordConfirmation } = this.state;

    return (
      <div className="App">
        <h2 className="App">SignUp</h2>
        <Mutation mutation={SIGNUP_USER} variables={{ username, email, password }}>
          {(signupUser, { data, loading, error }) => {
            return (
              <form className="form" onSubmit={event => this.handleSubmit(event, signupUser)}>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={this.handleChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={this.handleChange}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={this.handleChange}
                />
                <input
                  type="password"
                  name="passwordConfirmation"
                  placeholder="Confirm Password"
                  value={passwordConfirmation}
                  onChange={this.handleChange}
                />
                <button
                  type="submit"
                  className="button-primary"
                  disabled={loading || this.validateForm()}
                >
                    Submit
                  </button>
                {error && <Error {...{ error }} />}
              </form>
            );
          }}
        </Mutation>
      </div>
    );
  }
};

export default withRouter(SignUp);
