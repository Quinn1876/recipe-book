import React from 'react';
import { Redirect } from 'react-router';
import useAuthContext from '../../hooks/auth-context';
import useUser from '../../hooks/user';
import Profile from './Profile';

const ProfileContainer = (): React.ReactElement | null => {
  const { isAuthenticated } = useAuthContext();
  const user = useUser();

  if (!isAuthenticated()) {
    return <Redirect to="/sign-in"/>;
  }
  return user && <Profile user={user}/>;
};

export default ProfileContainer;
