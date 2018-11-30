import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import {
  View,
  Image,
  Dimensions
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { authChanged } from '../actions';

const IMAGE_WIDTH = Dimensions.get('window').width;

class AdminHome extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Image source={require('../assets/images/imageCc.jpg')} style={{ width: IMAGE_WIDTH, flex: 1 }} />

        <View style={styles.containerStyle}>
          <Button
            fontWeight='600'
            backgroundColor='#f9a602'
            title='Financeiro'
            icon={{ name: 'attach-money', type: 'material-icons' }}
            rounded
            onPress={() => Actions.financial()}
            buttonStyle={{ elevation: 2 }}
          />

          <Button
            fontWeight='600'
            backgroundColor='#007aff'
            title='Gerenciar Alunos'
            icon={{ name: 'people' }}
            rounded
            onPress={() => Actions.students()}
            buttonStyle={{ elevation: 2 }}
          />

          <Button
            fontWeight='600'
            backgroundColor='#007aff'
            title='Gerenciar Treinos'
            icon={{ name: 'calendar', type: 'font-awesome' }}
            onPress={() => Actions.train()}
            buttonStyle={{ elevation: 2 }}
            rounded
          />
        </View>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    justifyContent: 'space-around',
    height: 200,
    elevation: 5
  }
};

const mapStateToProps = state => {
  return {
    hours: state.exercise.hours
  };
};

export default connect(mapStateToProps, { authChanged })(AdminHome);
