import React from 'react';

import { FirebaseContextConsumer } from './context'

interface Props {
  child: React.FC
}

const connectFB = <P extends object>(Component: React.ComponentType<P>): React.FC<P> => (props) => {
  return (
    <FirebaseContextConsumer>
      {firebaseContext => firebaseContext && (
          <Component {...props} firebaseContext={firebaseContext}/>
        )
      }
    </FirebaseContextConsumer>
  )
}

export default connectFB;
