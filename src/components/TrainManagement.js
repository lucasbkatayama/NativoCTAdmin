import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

import { classesFetch } from '../actions';
import { TableDivision } from './common';
import ClassItem from './ClassItem';


class StudentManagement extends Component {
  componentDidMount() {
    this.props.classesFetch();
  }

  render() {
    return (
      <ScrollView>

        <View style={styles.topButtonStyle}>
          <Button
            fontWeight='600'
            title='Marcar Nova Aula'
            rounded
            backgroundColor='#007aff'
            icon={{ name: 'calendar', type: 'font-awesome' }}
            buttonStyle={{ elevation: 2 }}
            onPress={() => Actions.markClass()}
          />
          <Button
            fontWeight='600'
            title='Consultar Treinos Anteriores'
            rounded
            backgroundColor='#007aff'
            icon={{ name: 'search', type: 'font-awesome' }}
            buttonStyle={{ elevation: 2 }}
            onPress={() => Actions.classConsult()}
          />
        </View>

        <View style={{ flexDirection: 'row' }}>
          <TableDivision title='Próximos Treinos' />
        </View>

        <FlatList
          data={this.props.classes}
          renderItem={(e) => {
            if (e.item.uid >= new Date().getTime() - 86400000) {
              return <ClassItem classes={e} />;
            }
          }}
          keyExtractor={classes => classes.uid}
        />

      </ScrollView>
    );
  }
}

const styles = {
  topButtonStyle: {
    paddingTop: 5,
    paddingBottom: 5,
    height: 115,
    backgroundColor: 'white',
    elevation: 2,
    justifyContent: 'space-around'
  }
};

const mapStateToProps = state => {
  const classes = _.map(state.exercise.classes, (val, uid) => {
    return { ...val, uid };
  });

  return { classes };
};

export default connect(mapStateToProps, { classesFetch })(StudentManagement);
