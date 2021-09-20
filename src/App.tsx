/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {NativeRouter, Route} from 'react-router-native';
import Login from './pages/Login';
import Home from './pages/Home';
import {StoreProvider} from '@store/index';
import AuthGuard from '@components/AuthGuard';
import LoadingIndicator from '@components/LoadingIndicator';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <StoreProvider>
      <NativeRouter>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <LinearGradient colors={['#011725', '#1e252d']} style={{flex: 1}}>
            <LoadingIndicator />
            <Route exact path="/login" component={Login} />
            <AuthGuard>
              <Route exact path="/" component={Home} />
            </AuthGuard>
          </LinearGradient>
        </SafeAreaView>
      </NativeRouter>
    </StoreProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: '#011725',
  },
  regularText: {
    color: '#fffa',
    textAlign: 'center',
  },
  inputContainer: {
    borderBottomColor: '#33454faa',
    borderBottomWidth: 2,
    marginTop: 20,
  },
  container: {
    padding: 20,
  },
  link: {
    color: '#4eb4ca',
  },
  loginButton: {
    borderWidth: 2,
    borderColor: '#22b08a',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  loginButtonText: {
    color: '#22b08a',
    fontSize: 20,
  },
});

export default App;
