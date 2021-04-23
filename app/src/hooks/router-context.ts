import { useMemo, useContext } from 'react';
import { useRouteMatch } from 'react-router';
import { RouterContext, RouterContextI } from '../context/router';

interface RouterContextHook {
  routerContext: RouterContextI;
  pageContext: RouterContextI;
}

const useRouterContext = (routerName?: string): RouterContextHook => {
  const routerContext = useContext<RouterContextI>(RouterContext);
  const match = useRouteMatch();

  const pageContext = useMemo(
    () => ({
      path: match.path,
      url: match.url,
      routerName
    }),
    [match, routerName],
  );

  return {
    routerContext,
    pageContext,
  };
};

export default useRouterContext;
