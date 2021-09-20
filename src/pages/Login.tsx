/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback, FC} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Pressable,
  TouchableOpacity,
  ToastAndroid,
  useWindowDimensions,
} from 'react-native';
import {makeAutoObservable} from 'mobx';
import {Observer} from 'mobx-react-lite';
import {useStore} from '@store/index';
import type {CredentialData} from '@store/auth';
import {useHistory} from 'react-router-native';

class LoginForm {
  constructor() {
    makeAutoObservable(this);
  }

  private _email = '';
  get email() {
    return this._email;
  }
  set email(value: string) {
    this._hasErrors &&= false;
    this._email = value;
  }

  private _password = '';
  get password() {
    return this._password;
  }
  set password(value: string) {
    this._hasErrors &&= false;
    this._password = value;
  }

  showPassword = false;

  private _hasErrors = false;
  get hasErrors() {
    return this._hasErrors;
  }
  set hasErrors(value: boolean) {
    this._hasErrors = value;
  }

  get mayButtonBeActive() {
    return !this.hasErrors && !!(this.email && this.password);
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  get credentialData(): CredentialData {
    return {
      email: this.email,
      password: this.password,
    };
  }
}

const useLoginForm = () => {
  const [loginData] = useState(() => new LoginForm());
  return loginData;
};

const Login: FC = () => {
  const {auth, misc} = useStore();
  const history = useHistory();
  const winDim = useWindowDimensions();
  const loginData = useLoginForm();

  const onLogin = useCallback(async () => {
    misc.setIsLoading(true);

    const success = await auth.login(loginData.credentialData);

    if (success) history.push('/');
    else {
      loginData.hasErrors = true;
      ToastAndroid.show('credenciales inválidas', ToastAndroid.SHORT);
    }
    misc.setIsLoading(false);
  }, [loginData, auth, misc, history]);

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={[styles.container, {minHeight: winDim.height}]}>
        {/* Header */}
        <View style={{flex: 1, alignItems: 'center'}}>
          <Image source={require('../img/brand.png')} style={styles.brandImg} />
          <Text style={[styles.regularText, {fontSize: 16}]}>
            Helping peope evolve with work
          </Text>
        </View>
        {/* form */}
        <View style={{justifyContent: 'center'}}>
          <View style={styles.inputContainer}>
            <Observer>
              {() => (
                <TextInput
                  value={loginData.email}
                  onChangeText={value => {
                    loginData.email = value;
                  }}
                  placeholder="E-mail"
                  placeholderTextColor="#333f4d"
                />
              )}
            </Observer>
          </View>
          <View
            style={[
              {alignItems: 'center', flexDirection: 'row'},
              styles.inputContainer,
            ]}>
            <Observer>
              {() => (
                <TextInput
                  value={loginData.password}
                  onChangeText={value => {
                    loginData.password = value;
                  }}
                  style={{width: 'auto', flex: 1}}
                  placeholder="Password"
                  placeholderTextColor="#333f4d"
                  secureTextEntry={!loginData.showPassword}
                />
              )}
            </Observer>
            <Pressable onPress={() => loginData.toggleShowPassword()}>
              <Observer>
                {() => (
                  <Image
                    source={
                      loginData.showPassword
                        ? require('../img/visible.png')
                        : require('../img/unvisible.png')
                      // ? require('../img/1x/baseline_visibility_black_24dp.png')
                      // : require('../img/1x/baseline_visibility_off_black_24dp.png')
                    }
                    style={{width: 213 * 0.12, height: 184 * 0.12}}
                  />
                )}
              </Observer>
            </Pressable>
          </View>
          <Observer>
            {() =>
              loginData.hasErrors ? (
                <Text style={styles.errorMessage}>
                  E-mail or password is wrong!
                </Text>
              ) : null
            }
          </Observer>
        </View>

        {/* forgot password */}
        <View style={{flex: 2, justifyContent: 'space-evenly'}}>
          <TouchableOpacity style={{alignItems: 'center'}}>
            <Text style={[styles.link, {fontSize: 20}]}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* button */}
          <View>
            <Observer>
              {() => (
                <TouchableOpacity
                  onPress={onLogin}
                  style={[
                    styles.loginButton,
                    !loginData.mayButtonBeActive && styles.loginButtonDisabled,
                  ]}
                  disabled={!loginData.mayButtonBeActive}>
                  <Text style={styles.loginButtonText}>Log In</Text>
                </TouchableOpacity>
              )}
            </Observer>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 20,
              }}>
              <Text style={styles.regularText}>
                New user or need access code? Go
              </Text>
              <TouchableOpacity style={{marginLeft: 4}}>
                <Text style={[styles.link, {fontWeight: 'bold'}]}>HERE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    color: 'red',
  },
  brandImg: {
    width: 819 * 0.4,
    height: 167 * 0.4,
    marginTop: 40,
    marginBottom: 20,
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
  loginButtonDisabled: {opacity: 0.5},
});

export default Login;
