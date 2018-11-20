import React, { Component } from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo';
import { Actions } from 'react-native-router-flux';
import { Header, Button } from 'react-native-elements';
import firebase from 'firebase';
import { connect } from 'react-redux';

import { authChanged } from '../actions';

class StudentEditProfile extends Component {
    exitApp() {
      firebase.auth().signOut();
      this.props.authChanged({ prop: 'user', value: null });
    }

  render() {
    return (
      <LinearGradient colors={['#3f704d', '#4682b4', '#7ef9ff']} style={styles.containerStyle}>
        <View>
        <Header
          centerComponent={{ text: 'CONFIGURAÇÕES', style: { fontSize: 20, color: '#fff' } }}
          leftComponent={{
            icon: 'chevron-left',
            type: 'octicon',
            color: '#fff',
            onPress: () => Actions.pop(),
           }}
          outerContainerStyles={{ height: 75, borderBottomWidth: 0 }}
          backgroundColor='rgba(0, 0, 0, 0)'
        />
      <Button title='SAIR' rounded backgroundColor='red' onPress={this.exitApp.bind(this)} />
      </View>
      </LinearGradient>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
  },
  containerTopStyle: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  flatListContainerStyle: {
    margin: 10,
    elevation: 2,
    borderRadius: 5,
    marginTop: 0
  },
  buttonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  },
  buttonStyle: {
    elevation: 2,
    width: 150
  },
  disabledButtonStyle: {
    backgroundColor: '#0F52BA',
    borderWidth: 1,
    borderColor: '#fff'
  },
  infoContainerStyle: {
    height: 40,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerMiddleStyle: {
    paddingLeft: 15,
    elevation: 2,
    paddingBottom: 5,
    backgroundColor: '#fff'
  },
  buttonStyle: {
    marginTop: 15,
    elevation: 2
  },
};

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps, { authChanged })(StudentEditProfile);
