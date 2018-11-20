import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

import { studentsFetch } from '../actions';
import { TableDivision } from './common';
import ListItem from './common/ListItem';


class StudentManagement extends Component {
  componentWillMount() {
    this.props.studentsFetch();
  }

  render() {
    return (
      <ScrollView>

        <View style={styles.topButtonStyle}>
          <Button
            fontWeight='600'
            title='Cadastrar Novo Aluno'
            rounded
            backgroundColor='#007aff'
            icon={{ name: 'person-add' }}
            buttonStyle={{ elevation: 2 }}
            onPress={() => Actions.studentCreate()}
          />
        </View>

        <View style={{ flexDirection: 'row' }}>
          <TableDivision title='Nome' style={{ flex: 4, alignItems: 'flex-start' }} />
          <TableDivision title='Status' flex={1} />
        </View>

        <FlatList
          data={this.props.students}
          renderItem={(e) => <ListItem student={e} />}
          keyExtractor={student => student.uid}
        />

      </ScrollView>
    );
  }
}

const styles = {
  topButtonStyle: {
    paddingTop: 5,
    paddingBottom: 5,
    height: 70,
    backgroundColor: 'white',
    elevation: 2,
    justifyContent: 'space-around'
  }
};

const mapStateToProps = state => {
  const students = _.map(state.student.users, (val, uid) => {
    return { ...val, uid };
  });
  return { students };
};

export default connect(mapStateToProps, { studentsFetch })(StudentManagement);
