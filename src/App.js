/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  TextInput,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const App: () => Node = () => {
  const [user, setUser] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <LinearGradient colors={['#011725', '#1e252d']} style={{flex: 1}}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View
            style={[
              styles.container,
              {minHeight: Dimensions.get('window').height},
            ]}>
            {/* Header */}
            <View style={{flex: 1, alignItems: 'center'}}>
              <Image
                source={require('./img/idk.png')}
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
                <TextInput
                  value={user}
                  onChangeText={setUser}
                  placeholder="E-mail"
                  placeholderTextColor="#333f4d"
                />
              </View>
              <View
                style={[
                  {alignItems: 'center', flexDirection: 'row'},
                  styles.inputContainer,
                ]}>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  style={{width: 'auto', flex: 1}}
                  placeholder="Password"
                  placeholderTextColor="#333f4d"
                  secureTextEntry={!showPassword}
                />
                <Pressable onPress={() => setShowPassword(s => !s)}>
                  <Image
                    source={
                      showPassword
                        ? require('./img/1x/baseline_visibility_black_24dp.png')
                        : require('./img/1x/baseline_visibility_off_black_24dp.png')
                    }
                    style={{width: 40, height: 40}}
                  />
                </Pressable>
              </View>
            </View>

            {/* forgot password */}
            <View style={{flex: 2, justifyContent: 'space-evenly'}}>
              <TouchableOpacity style={{alignItems: 'center'}}>
                <Text style={[styles.link, {fontSize: 20}]}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              {/* button */}
              <View>
                <TouchableOpacity onPress={() => {}} style={styles.loginButton}>
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
                    <Text style={[styles.link, {fontWeight: 'bold'}]}>
                      HERE
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
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
