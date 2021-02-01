import React from 'react';
// import { Redirect } from 'react-router-dom';

const withAuthRedirect = <P extends Record<string, unknown>>(Page: React.ComponentType<P>): React.ComponentType<P> => (props: P): React.ReactElement => {
  // TODO FIX
  // if (true) {
  return <Page {...props}/>;
  // } else {
  //   return <Redirect to='/signIn' />
  // }
};

export default withAuthRedirect;
