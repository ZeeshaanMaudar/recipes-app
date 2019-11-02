import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import withSession from '../withSession';
import { LIKE_RECIPE, GET_RECIPE, UNLIKE_RECIPE } from '../../queries';


class LikeRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      username: ''
    }
  }

  componentDidMount() {

    if(this.props.session.getCurrentUser) {
      const { username, favorites } = this.props.session.getCurrentUser;
      const { _id } = this.props;
      const prevLiked = favorites.findIndex(favorite => favorite._id === _id) > -1;

      this.setState({ liked: prevLiked, username });
    }
  }

  handleClick = (likeRecipe, unlikeRecipe) => {
    this.setState(prevState => ({
      liked: !prevState.liked
    }), () => this.handleLike(likeRecipe, unlikeRecipe));
  }

  handleLike = (likeRecipe, unlikeRecipe) => {
    const { liked } = this.state;

    if(liked) {
      likeRecipe().then(async ({ data }) => {
        // console.log(666, data)
        await this.props.refetch();
      });
    } else {
      unlikeRecipe().then(async ({ data }) => {
        // console.log(888, data)
        await this.props.refetch();
      })
    }
  }

  updateLike = (cache, { data }) => {
    const { _id } = this.props;
    const { likes } = data.likeRecipe;

    const { getRecipe } = cache.readQuery({
      query: GET_RECIPE,
      variables: { _id }
    });

    cache.writeQuery({
      query: GET_RECIPE,
      variables: { _id },
      data: {
        getRecipe: {...getRecipe, likes: likes + 1}
      }
    })
  }

  updateUnlike = (cache, { data }) => {
    const { _id } = this.props;
    const { likes } = data.unlikeRecipe;

    const { getRecipe } = cache.readQuery({
      query: GET_RECIPE,
      variables: { _id }
    });

    cache.writeQuery({
      query: GET_RECIPE,
      variables: { _id },
      data: {
        getRecipe: {...getRecipe, likes: likes - 1}
      }
    })
  }

  render() {
    const { username, liked } = this.state;
    const { _id } = this.props;

    if(!username) {
      return null;
    }

    return (
      <Mutation
        mutation={UNLIKE_RECIPE}
        variables={{ _id, username }}
        update={this.updateUnlike}
      >
        {unlikeRecipe => {
          return (
            <Mutation
              mutation={LIKE_RECIPE}
              variables={{ _id, username }}
              update={this.updateLike}
            >
              {likeRecipe => {
                return (
                  <button onClick={() => this.handleClick(likeRecipe, unlikeRecipe)}>
                    {liked ? 'unlike' : 'Like'}
                  </button>
                );
              }}
            </Mutation>
          );
        }}
      </Mutation>
    );
  }
}

export default withSession(LikeRecipe);
