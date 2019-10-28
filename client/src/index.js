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

const Root = ({ refetch }) => (
  <Router>
    <Fragment>
      <NavBar />
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/search" component={Search} />
        <Route path="/signin" render={() => <SignIn {...{ refetch }} />} />
        <Route path="/signup" render={() => <SignUp {...{ refetch }} />} />
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
