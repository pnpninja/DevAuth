import React from 'react';
import { Alert, AsyncStorage } from 'react-native';
import _ from 'lodash';
import OneSignal from 'react-native-onesignal';

import BeforeSignIn from './containers/BeforeSignIn';
import AfterSignIn from './containers/AfterSignIn';
import { __SIGN_IN_FLAG, __ONESIGNAL_APP_ID } from './utils';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      is_signed_in: false
    }

    OneSignal.setRequiresUserPrivacyConsent(false);
    OneSignal.init(__ONESIGNAL_APP_ID, {
      kOSSettingsKeyAutoPrompt: true,
    });
  }

  async componentDidMount() {
    try {
      const is_signed_in = !_.isEmpty(await AsyncStorage.getItem(__SIGN_IN_FLAG));
      this.setState({ is_signed_in });
    } catch (error) {
      alert('Sign in status check failed. \n ' + error.message)
    }
  }

  requestLoginListener = notificationObj => {
    const payload = notificationObj.notification.payload.additionalData;
    
    if (payload && _.get(payload, 'type') === 'login') {
      if (this.state.is_signed_in === false) return Alert.alert(
        'Warning',
        'Please sign in to process the Authentication.',
        [{ text: 'Confirm', onPress: null }],
        { cancelable: false },
      );

      this.setState({
        open_confirm_auth: true,
        request_payload: payload
      });
    }
  }

  cleanFlag = () => this.setState({ open_confirm_auth: false, request_payload: {} });

  sendToAfterSignIn = () => this.setState({ is_signed_in: true });
  backToBeforeSignIn = () => this.setState({ is_signed_in: false });

  render() {
    const { is_signed_in } = this.state;

    return (
      is_signed_in ? (
        <AfterSignIn backToBeforeSignIn={ this.backToBeforeSignIn } />
      ) : (
        <BeforeSignIn sendToAfterSignIn={ this.sendToAfterSignIn } />
      )
    );
  }
}
