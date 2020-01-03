import React from 'react';
import _ from 'lodash'
import moment from 'moment';
import { AsyncStorage, Modal, Text, StyleSheet, TouchableOpacity, View } from 'react-native';

import ApiCaller from '../../ApiCaller';
import { defaultStyles, __USER_PROFILE } from '../../utils';

class ConfirmAuthModal extends React.Component {

  state = {
    visible: false,
    payload: {}
  };

  show = payload => this.setState({ visible: true, payload });
  dismiss = () => this.setState({ visible: false, payload: {} });
  confirm = async () => {
    const { payload = {} } = this.state;
    const { redirect_url, request_id, scope } = payload;

    // const host = document.createElement('a');
    // host.href = redirect_url;

    try {
      // const user_profile = await AsyncStorage.getItem(__USER_PROFILE);
      const response = await ApiCaller.post('/callback', {
          request_id,
          email: 'email@email.com',
          name: 'name',
          dob: 'dob'
          // user_profile: _.pick(user_profile, _.split(scope, ','))
        }, {
        baseURL: 'http://172.20.10.5:4000',
        timeout: 10000,
      });
      if (response.status === 200) {
        alert('You Have Just Accepted an Authentication!');
        this.dismiss();
      }
    } catch (error) {
      console.log(error);
      alert(redirect_url);
      this.dismiss();
    }
  }

  render() {
    const { payload = {}, visible } = this.state;
    const { timestamp, scope, client_name } = payload;

    return (
      <Modal
        animationType='slide'
        transparent={ false }
        visible={ visible }
        onRequestClose={() => {}}
      >
        <View style={ styles.container }>
          <View style={ styles.displayer }>
            <Text style={ styles.title }>{ client_name }</Text>
            <View style={ defaultStyles.hr } />
            <Text style={ styles.label }>{ '- The Application Request - ' }</Text>
            {
              _.map(_.split(scope, ','), (value, i) => (
                <Text key={i} style={ styles.label }>{ value }</Text>
              ))
            }
            <View style={ defaultStyles.hr } />
            <Text style={ styles.label }>{ 'Requested at ' + moment(timestamp).format('MM/DD/YYYY HH:mm') }</Text>
          </View>

          <View style={ styles.actions }>
            <TouchableOpacity style={[ styles.action, { backgroundColor: '#ff5e5e' } ]} onPress={ this.dismiss }>
              <Text style={ styles.buttonLabel }>DECLINE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[ styles.action, { backgroundColor: '#5aff59' } ]} onPress={ this.confirm }>
              <Text style={ styles.buttonLabel }>CONFIRM</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

export default ConfirmAuthModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  displayer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actions: {
    flexShrink: 0,
    flexBasis: 48,
    width: '100%',
    flexDirection: 'row',
  },
  title: {
    fontSize: 24,
    marginVertical: 8
  },
  label: {
    fontSize: 16,
    marginVertical: 8
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  action: {
    flexBasis: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  }
});