/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {createContext, useContext, useState} from 'react';
import type {Node} from 'react';

import {Auth} from './auth';

interface Store {
  auth: Auth;
}

const StoreContext = createContext<?Store>(null);

export const useStore = (): Store => {
  const store = useContext<?Store>(StoreContext);
  if (!store) {
    throw new Error('store is null');
  }
  return store;
};

const createStore = (): Store => ({
  auth: new Auth(),
});

export const StoreProvider: (Props: {children: Node}) => Node = ({
  children,
}) => {
  const [value] = useState<Store>(createStore);
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
