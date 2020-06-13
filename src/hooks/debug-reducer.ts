import { useReducer, useCallback } from 'react';

const useDebugReducer = <S, A>(
  reducer: React.Reducer<S, A>,
  initialState: S
) => {
  const [state, debug] = useReducer(reducer, initialState);

  const dispatch = useCallback(
    (action: A) => {
      console.log('Previous State: ', state);
      console.log('Action: ', action);
      debug(action);
      console.log('New State', state);
    },
    [debug, state]
  );

  return {state, dispatch};
};

export default useDebugReducer;
