import React from 'react';
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { isSignedIn } from '../store/selectors'

const withAuthRedirect = <P extends object>(Page: React.ComponentType<P>): React.SFC<P> => (props: P) => {
  const signedIn = useSelector(isSignedIn);
  if (signedIn) {
    return <Page {...props}/>
  } else {
    return <Redirect to='/signIn' />
  }
}

export default withAuthRedirect;
