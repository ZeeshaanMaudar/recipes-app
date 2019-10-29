import React, { Component } from 'react';

import withSession from '../withSession';

class LikeRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }
  }

  componentDidMount() {

    const { getCurrentUser } = this.props.session;

    if(getCurrentUser) {
      const { username } = getCurrentUser;

      this.setState({ username });
    }
    return null;
  }

  render() {
    console.log(444, this.props)
    const { username } = this.state;
    console.log(555, username)

    if(!username) {
      return null;
    }

    return (
      <button>Like</button>
    );
  }
}

export default withSession(LikeRecipe);
