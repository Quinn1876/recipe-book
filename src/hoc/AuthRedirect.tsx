import React from 'react';
// import { Redirect } from 'react-router-dom';

const withAuthRedirect = <P extends Record<string, unknown>>(Page: React.ComponentType<P>): React.SFC<P> => (props: P) => {
  // TODO FIX
  // if (true) {
  return <Page {...props}/>;
  // } else {
  //   return <Redirect to='/signIn' />
  // }
};

export default withAuthRedirect;
