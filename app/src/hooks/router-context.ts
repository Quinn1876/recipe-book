import { useMemo, useContext } from 'react';
import { useRouteMatch } from 'react-router';
import { RouterContext, RouterContextI } from '../context/router';

interface RouterContextHook {
  routerContext: RouterContextI;
  pageContext: RouterContextI;
}

const useRouterContext = (routerName?: string): RouterContextHook => {
  const routerContext = useContext<RouterContextI | null>(RouterContext);
  const match = useRouteMatch();

  const pageContext = useMemo(
    () => ({
      path: match.path,
      url: match.url,
      routerName
    }),
    [match, routerName],
  );

  const routerContextMemo = useMemo<RouterContextI>(() => {
    return routerContext
      ? routerContext
      : {
        path: '',
        url: '',
        routerName: '',
      };
  }, [routerContext]);

  return {
    routerContext: routerContextMemo,
    pageContext,
  };
};

export default useRouterContext;
