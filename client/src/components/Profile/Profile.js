import React from 'react';

import UserInfo from './UserInfo';
import UserRecipes from './UserRecipes';
import withAuth from '../withAuth';


const Profile = ({ session }) => {
  const { username } = session.getCurrentUser;

  return (
    <div className="App">
      <UserInfo {...{ session }} />
      <UserRecipes {...{ username }} />
    </div>
  );
};

export default withAuth(session => session && session.getCurrentUser)(Profile);
