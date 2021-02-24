import React from 'react';
import { Redirect } from 'react-router-dom';
import useAuthContext from '../hooks/auth-context';

const withAuthRedirect = <P extends Record<string, unknown>>(Page: React.ComponentType<P>): React.ComponentType<P> => (props: P): React.ReactElement => {
  const { isAuthenticated } = useAuthContext();
  if (isAuthenticated()) {
    return <Page {...props}/>;
  } else {
    return <Redirect to='/sign-in' />;
  }
};

export default withAuthRedirect;
