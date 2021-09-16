import React, {createContext, useContext, useState, FC} from 'react';

import {Auth} from './auth';
import Picture from './picture';

interface Store {
  auth: Auth;
  picture: Picture;
}

const StoreContext = createContext<Store | null>(null);

export const useStore = (): Store => {
  const store = useContext<Store | null>(StoreContext);
  if (!store) {
    throw new Error('store is null');
  }
  return store;
};

const createStore = (): Store => ({
  auth: new Auth(),
  picture: new Picture(),
});

export const StoreProvider: FC = ({children}) => {
  const [value] = useState<Store>(createStore);
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
