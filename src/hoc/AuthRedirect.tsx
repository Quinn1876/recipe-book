import React from 'react';
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { getUser } from '../store/selectors'

const withAuthRedirect = <P extends object>(Page: React.ComponentType<P>): React.SFC<P> => (props: P) => {
  const user = useSelector(getUser);
  if (user) {
    return <Page {...props}/>
  } else {
    return <Redirect to='/signIn' />
  }
}

export default withAuthRedirect;
