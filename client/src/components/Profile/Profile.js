import React from 'react';

import UserInfo from './UserInfo';
import UserRecipes from './UserRecipes';

const Profile = ({ session }) => {
  const { username } = session.getCurrentUser;

  return (
    <div className="App">
      <UserInfo {...{ session }} />
      <UserRecipes {...{ username }} />
    </div>
  );
};

export default Profile;
