import _ from 'lodash';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity
} from 'react-native';

class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Sign In',
  };

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    }
  }

  handleSubmit = async () => {
    try {
      this.props.screenProps.sendToAfterSignIn();
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
    const { username, password } = this.state;

    return (
      <ScrollView contentContainerStyle={ styles.container } keyboardShouldPersistTaps='handled'>
        <View style={ styles.upperInputs }>
          <Text style={ styles.subtitle }>USERNAME</Text>
          <TextInput
            autoFocus
            style={[ styles.textInput, { borderBottomColor: 'gray' } ]}
            onChangeText={ this.handleOnChange('username') }
            value={ username }
          />
          <Text style={ styles.subtitle }>PASSWORD</Text>
          <TextInput
            style={ styles.textInput }
            onChangeText={ this.handleOnChange('password') }
            value={ password }
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
            <Text style={ styles.label }>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

export default SignInScreen;

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
    marginTop: 32,
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
