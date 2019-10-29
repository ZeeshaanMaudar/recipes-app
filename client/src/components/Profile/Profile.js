import React from 'react';

import UserInfo from './UserInfo';

const Profile = ({ session }) => (
  <div className="App">
    <UserInfo {...{ session }} />
  </div>
);

export default Profile;
