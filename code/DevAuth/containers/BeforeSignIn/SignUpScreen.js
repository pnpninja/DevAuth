import _ from 'lodash';
import React from 'react';
import {
  AsyncStorage,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView
} from 'react-native';

import { defaultStyles, __ONESIGNAL_USER_ID_KEY, __USER_PROFILE } from '../../utils';
import ApiCaller from '../../ApiCaller';

class SignUpScreen extends React.Component {
  static navigationOptions = {
    title: 'Sign Up',
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',

      user_profile: {
        name: '',
        birthOfDate: '',
        gender: '',
        avatar: '',
      }
    }
  }

  handleSubmit = async () => {
    const { email, password, user_profile } = this.state;

    try {
      const device_id = await AsyncStorage.getItem(__ONESIGNAL_USER_ID_KEY);
      const response = await ApiCaller.post(`/user/register`, {
          email,
          password,
          device_id
        }, {
        baseURL: ApiCaller.getHOST(),
        timeout: 10000,
      });
      if (response.status === 200) {
        await AsyncStorage.setItem(__USER_PROFILE, JSON.stringify(user_profile))
        this.props.screenProps.sendToAfterSignIn();
      }
    } catch (error) {
      alert(error.message);
    }
  }

  handleOnChange = key => text => {
    let _state = _.cloneDeep(this.state);
    _.set(_state, key, text);
    this.setState(_state);
  }

  render() {
    const { navigation } = this.props;
    const { email, password, user_profile } = this.state;

    return (
      <ScrollView contentContainerStyle={ styles.container } keyboardShouldPersistTaps='handled'>
        <View style={ styles.upperInputs }>
          <Text style={ styles.subtitle }>EMAIL</Text>
          <TextInput
            autoFocus
            keyboardType='email-address'
            style={[ styles.textInput, { borderBottomColor: 'gray' } ]}
            onChangeText={ this.handleOnChange('email') }
            value={ email }
          />
          <Text style={ styles.subtitle }>PASSWORD</Text>
          <TextInput
            style={ styles.textInput }
            secureTextEntry
            onChangeText={ this.handleOnChange('password') }
            value={ password }
          />
        </View>
        <View style={ defaultStyles.hr }></View>
        <View style={ styles.lowerInputs }>
          <Text style={ styles.subtitle }>NAME</Text>
          <TextInput
            style={ styles.textInput }
            onChangeText={ this.handleOnChange('user_profile.name') }
            value={ user_profile.name }
          />
          <Text style={ styles.subtitle }>BIRTH OF DATE</Text>
          <TextInput
            style={ styles.textInput }
            placeholder='MM/DD/YYYY'
            onChangeText={ this.handleOnChange('user_profile.birthOfDate') }
            value={ user_profile.birthOfDate }
          />
          <Text style={ styles.subtitle }>GENDER</Text>
          <TextInput
            style={ styles.textInput }
            placeholder='Male / Female'
            onChangeText={ this.handleOnChange('user_profile.gender') }
            value={ user_profile.gender }
          />
        </View>
        <View style={ styles.actions }>
          <TouchableOpacity
            style={ styles.action }
            onPress={ () => navigation.goBack() }
          >
            <Text style={ styles.label }>Cacnel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={ styles.action }
            onPress={ this.handleSubmit }
          >
            <Text style={ styles.label }>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 64,
  },
  upperInputs: {
    width: '80%',
    alignItems: 'center',
  },
  lowerInputs: {
    width: '80%',
    alignItems: 'center',
  },
  actions: {
    flexDirection: 'row',
    marginVertical: 32,
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 4,
  },
  textInput: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    textAlign: 'center',
    fontSize: 16
  },
  action: {
    marginHorizontal: 8,
    height: 32,
    width: '40%',
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
