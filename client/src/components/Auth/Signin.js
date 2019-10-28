import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { SIGNIN_USER } from '../../queries';
import Error from '../Error';

const initialState = {
  username: "",
  password: ""
};

class SignIn extends Component {
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

  handleSubmit = (event, signinUser) => {
    event.preventDefault();
    signinUser().then(({ data }) => {
      console.log(data);
      const { token } = data.signinUser;
      localStorage.setItem('token', token);
      this.clearState();
      this.props.history.push('/');
    });
  };

  validateForm = () => {
    const { username, password } = this.state;

    const isInvalid = !username || !password;

    return isInvalid;
  };

  render() {
    const { username, password } = this.state;

    return (
      <div className="App">
        <h2 className="App">SignIn</h2>
        <Mutation mutation={SIGNIN_USER} variables={{ username, password }}>
          {(signinUser, { data, loading, error }) => {
            return (
              <form className="form" onSubmit={event => this.handleSubmit(event, signinUser)}>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={this.handleChange}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
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

export default withRouter(SignIn);
