import React from 'react';
import { 
  Modal, 
  StyleSheet, 
  Text, 
  View, 
  ActivityIndicator,
  Platform
} from 'react-native';
import _ from 'lodash';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000a',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 50
  }
});


class LoadingModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    }

    this.show = text => this.setState({ visible: true, text });
    this.dismiss = cb => this.setState({ visible: false }, () => {
      if (_.isFunction(cb)) cb();
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...nextProps});
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(this.state, nextState);
  }

  render() {
    return (
      <Modal
        animationType='fade'
        transparent
        visible={this.state.visible}
        supportedOrientations={['portrait', 'landscape']}
        onRequestClose={() => {}}
        onDismiss={this.props.onDismiss}
      >
        <View style={ styles.container }>
          <Text style={ styles.title }>{this.state.text}</Text>
          <ActivityIndicator
            color={'#fff'}
            size={Platform.OS === 'android' ? 50 : 0}
          />
        </View>
      </Modal>
    );
  }
}

export default LoadingModal;