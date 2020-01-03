import React from 'react';
import { Alert, Text, StyleSheet, View, AsyncStorage, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import OneSignal from 'react-native-onesignal';

import { __ONESIGNAL_USER_ID_KEY } from '../../utils';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';

class BeforeSignInIndex extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {

    }
  }

  async componentDidMount() {
    await OneSignal.userProvidedPrivacyConsent();
    OneSignal.addEventListener('ids', this.idsListener);
    OneSignal.addEventListener('opened', this.requestLoginListener);
  }

  handleDeviceMismatch = () => {

  }

  componentWillUnmount() {
    OneSignal.removeEventListener('ids', this.idsListener);
    OneSignal.removeEventListener('opened', this.requestLoginListener);
  }

  requestLoginListener = () => {
    return Alert.alert(
      'Warning',
      'Please sign in to process the Authentication.',
      [{ text: 'Confirm', onPress: null }],
      { cancelable: false },
    );
  }

  async idsListener(device) {
    // this.props.updateNotificationDeviceId(device.userId);
    // alert(device.userId);
    try {
      const userId = await AsyncStorage.getItem(__ONESIGNAL_USER_ID_KEY);
      // if (userId !== device.userId)
      //   return this.handleDeviceMismatch();
      await AsyncStorage.setItem(__ONESIGNAL_USER_ID_KEY, device.userId);
      // alert(await AsyncStorage.getItem(__ONESIGNAL_USER_ID_KEY))
    } catch (error) {
      alert(error.message);
    }
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={ styles.container }>
        <TouchableOpacity
          style={ styles.action }
          onPress={ () => navigation.navigate('SignUp') }
        >
          <Text style={ styles.label }>SIGN UP</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={ styles.action }
          onPress={ () => navigation.navigate('SignIn') }
        >
          <Text style={ styles.label }>SIGN IN</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const BeforeSignInNavigator = createStackNavigator({
  Profile: BeforeSignInIndex,
  SignIn: SignInScreen,
  SignUp: SignUpScreen,
});

class RootView extends React.Component {
  render() {
    return <BeforeSignInNavigator screenProps={{ sendToAfterSignIn: this.props.sendToAfterSignIn }}/>;
  }
}

export default RootView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  action: {
    marginVertical: 16,
    height: 32,
    width: '80%',
    borderRadius: 16,
    backgroundColor: '#8296ab',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold'
  }
});
