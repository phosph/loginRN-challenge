import React, {useEffect} from 'react';
import {useStore} from '@store/index';
import {observer} from 'mobx-react-lite';
import {autorun, action} from 'mobx';
import {useHistory} from 'react-router-native';
import {Button} from 'react-native';

const AuthGuard = observer(({children}) => {
  const {auth} = useStore();
  const history = useHistory();
  useEffect(
    () =>
      autorun(() => {
        if (!auth.isAuthenticated) history.replace('/login');
      }),
    [history, auth],
  );

  if (!auth.isAuthenticated) return null;
  return (
    <>
      <Button
        title="logout"
        onPress={action(() => {
          auth.isAuthenticated = false;
        })}
      />
      {children}
    </>
  );
});

export default AuthGuard;
