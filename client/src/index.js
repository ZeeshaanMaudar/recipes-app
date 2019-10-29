import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './index.css';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import App from './App';
import SignUp from './components/Auth/Signup';
import SignIn from './components/Auth/Signin';
import withSession from './components/withSession';
import NavBar from './components/NavBar';
import Search from './components/Recipe/Search';
import AddRecipe from './components/Recipe/AddRecipe';
import Profile from './components/Profile/Profile';
import RecipePage from './components/Recipe/RecipePage';

const client = new ApolloClient({
  uri: 'http://localhost:4444/graphql',
  fetchOptions: {
    credentials: 'include' 
  },
  request: operation => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token
      }
    })
  },
  onError: ({ networkError }) => {
    if(networkError) {
      console.log('Network Error', networkError);
    }
  }
});

const Root = ({ refetch, session }) => (
  <Router>
    <Fragment>
      <NavBar {...{ session }} />
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/search" component={Search} />
        <Route path="/profile" render={() => <Profile {...{ session }} />} />
        <Route path="/signin" render={() => <SignIn {...{ refetch }} />} />
        <Route path="/signup" render={() => <SignUp {...{ refetch }} />} />
        <Route path="/recipe/add" render={() => <AddRecipe {...{ session }} />} />
        <Route path="/recipes/:_id" component={RecipePage} />
        <Redirect to="/" />
      </Switch>
    </Fragment>
  </Router>
);

const RootWithSession = withSession(Root);

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>
, document.getElementById('root'));
