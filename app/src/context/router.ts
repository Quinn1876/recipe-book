import { createContext } from 'react';

export interface RouterContextI {
  path: string;
  url: string;
  routerName?: string;
}

export const RouterContext = createContext<RouterContextI>(null);
