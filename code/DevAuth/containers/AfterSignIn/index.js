import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import { Alert, AsyncStorage, TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import OneSignal from 'react-native-onesignal';

import { handleSignOut, __USER_PROFILE } from '../../utils';

import ConfirmAuthModal from '../../components/AfterSignIn/ConfirmAuthModal';

class AfterSignInIndex extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.confirmModal = React.createContext();

    this.state = {
      user_profile: {}
    }
  }

  async componentDidMount() {
    try {
      const user_profile = JSON.parse(await AsyncStorage.getItem(__USER_PROFILE));
      this.setState({ user_profile });
    } catch (error) {
      alert(error.message);
    }
    OneSignal.addEventListener('opened', this.requestLoginListener);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('opened', this.requestLoginListener);
  }

  requestLoginListener = notificationObj => {
    const payload = notificationObj.notification.payload.additionalData;
    if (payload && _.get(payload, 'type') === 'login') {
      const payload = notificationObj.notification.payload.additionalData;

      if (moment().valueOf() - moment(payload.timestamp).valueOf() > 60 * 1000)
        return alert('The request has expired. Please try again.');
  
      this.confirmModal.show(payload);
    }
  }

  handleSignOut = () => {
    Alert.alert(
      'Alert',
      'Are you sure to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: async () => {
            try {
              let errorMsg = await handleSignOut();
              if (errorMsg) alert(errorMsg);
              else this.props.screenProps.backToBeforeSignIn();
            } catch (error) {
              alert(error.message);
            }
          }
        },
      ],
      { cancelable: false },
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.screenProps.open_confirm_auth) {
      this.confirmModal.show(request_payload);
      this.props.screenProps.cleanFlag();
    }
  }

  render() {
    // const { navigation } = this.props;

    return (
      <View style={ styles.container }>
        <Text>
          Ready to handle Auth events.
        </Text>
        <TouchableOpacity
          style={ styles.action }
          onPress={ this.handleSignOut }
        >
          <Text style={ styles.label }>SIGN OUT</Text>
        </TouchableOpacity>
        <ConfirmAuthModal ref={ node => { this.confirmModal = node; }}/>
      </View>
    );
  }
}

const AfterSignInNavigator = createStackNavigator({
  Profile: AfterSignInIndex,
});

class RootView extends React.Component {
  render() {
    return <AfterSignInNavigator screenProps={{ backToBeforeSignIn: this.props.backToBeforeSignIn }}/>;
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
