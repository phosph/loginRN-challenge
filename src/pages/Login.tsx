/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback, FC} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Image,
  Pressable,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {observable, action} from 'mobx';
import {Observer} from 'mobx-react-lite';
import {useStore} from '../store';
import type {CredentialData} from '../store/auth';
import {useHistory} from 'react-router-native';

const Login: FC = () => {
  const {auth} = useStore();
  const history = useHistory();
  // const isDarkMode = useColorScheme() === 'dark';

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginData] = useState<CredentialData>(() =>
    observable({
      email: '',
      password: '',
    }),
  );

  const onLogin = useCallback(async () => {
    const success = await auth.login(loginData);
    if (success) history.push('/home');
    else ToastAndroid.show('credenciales inválidas', ToastAndroid.SHORT);
  }, [loginData, auth, history]);

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View
        style={[
          styles.container,
          {minHeight: Dimensions.get('window').height},
        ]}>
        {/* Header */}
        <View style={{flex: 1, alignItems: 'center'}}>
          <Image
            source={require('../img/idk.png')}
            style={{
              width: 819 * 0.4,
              height: 167 * 0.4,
              marginTop: 40,
              marginBottom: 20,
            }}
          />
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
                  onChangeText={action(value => {
                    loginData.email = value;
                  })}
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
                  onChangeText={action(value => {
                    loginData.password = value;
                  })}
                  style={{width: 'auto', flex: 1}}
                  placeholder="Password"
                  placeholderTextColor="#333f4d"
                  secureTextEntry={!showPassword}
                />
              )}
            </Observer>
            <Pressable onPress={() => setShowPassword(s => !s)}>
              <Image
                source={
                  showPassword
                    ? require('../img/1x/baseline_visibility_black_24dp.png')
                    : require('../img/1x/baseline_visibility_off_black_24dp.png')
                }
                style={{width: 40, height: 40}}
              />
            </Pressable>
          </View>
        </View>

        {/* forgot password */}
        <View style={{flex: 2, justifyContent: 'space-evenly'}}>
          <TouchableOpacity style={{alignItems: 'center'}}>
            <Text style={[styles.link, {fontSize: 20}]}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* button */}
          <View>
            <TouchableOpacity onPress={onLogin} style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Log In</Text>
            </TouchableOpacity>

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

export default Login;
