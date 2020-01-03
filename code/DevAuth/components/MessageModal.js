import React from 'react';
import { 
  Modal, 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity,
} from 'react-native';
import _ from 'lodash';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000a',
    justifyContent: 'center',
    alignItems: 'center'
  },
  displayView: {
    width: '80%',
    maxWidth: 300,
    minHeight: 240,
    maxHeight: '80%',
    backgroundColor: '#fff',
    borderRadius: 16,
  },
  title: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    flexShrink: 0,
    flexBasis: 48,
    justifyContent: 'center',
    paddingLeft: 16
  },
  message: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  actionsView: {
    borderTopWidth: 1,
    borderTopColor: '#000',
    flexShrink: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flexBasis: 48
  },
  action: {
    flex: 1,
    flexShrink: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  }
});

class MessageModal extends React.Component {
  constructor(props) {
    super(props);

    this.show = ( message = '', title = '通知', actions = this.defaultState.actions ) => {
      const nextState = { visible: true, title, message };
      if (_.isArray(actions)) nextState.actions = actions;
      this.setState( nextState );
    };
    this.dismiss = () => this.setState({ visible: false });
    this.handleOnPress = onPress => {
      this.dismiss();
      if (_.isFunction(onPress)) onPress();
    }

    this.defaultState = {
      visible: false,
      title: '通知',
      message: '',
      actions: [
        { text: '確定', onPress: this.dismiss }
      ]
    }

    this.state = _.cloneDeep(this.defaultState);
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(this.state, nextState);
  }

  render() {
    const { visible, title, message, actions } = this.state;

    return (
      <Modal
        animationType='fade'
        transparent
        visible={ visible }
        supportedOrientations={['portrait', 'landscape']}
        onRequestClose={() => {}}
        onDismiss={this.props.onDismiss}
      >
        <View style={ styles.container }>
          <View style={ styles.displayView }>
            <View style={ styles.title }>
              <Text style={{ fontSize: 20 }}>{ title }</Text>
            </View>
            {
              _.isString(message) ? (
                <View style={ styles.message }><Text style={{ fontSize: 16 }}>{ message }</Text></View>
              ) : (
                message
              )
            }
            <View style={ styles.actionsView }>
            {
              _.map(actions, (action, index) => (
                <TouchableOpacity
                  key={index}
                  style={ [ styles.action, index > 0 && { borderLeftWidth: 1, borderLeftColor: '#000' } ] }
                  onPress={ () => this.handleOnPress(action.onPress) }
                >
                  <Text style={{ fontSize: 16, color: action.color || 'blue' }}>{ action.text }</Text>
                </TouchableOpacity>
              ))
            }
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default MessageModal;