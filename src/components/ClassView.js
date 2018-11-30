import React, { Component } from 'react';
import _ from 'lodash';
import { View, Text, ScrollView } from 'react-native';

import ClassViewHourItem from './ClassViewHourItem';
import { TableDivision } from './common';

class ClassView extends Component {
  dateFormat() {
    const { uid } = this.props.classes;
    let dd = '' + new Date(parseInt(uid, 10)).getDate();
    let m = '' + (new Date(parseInt(uid, 10)).getMonth() + 1);
    const yyyy = new Date(parseInt(uid, 10)).getFullYear();
    if (m.length < 2) m = '0' + m;
    if (dd.length < 2) dd = '0' + dd;
    return (dd + '/' + m + '/' + yyyy);
  }

  renderHours(hours) {
    const hour = _.map(hours, (val, uid) => {
      return { ...val, uid };
    });
    return hour.map((item, index) =>
       <ClassViewHourItem date={this.props.classes.uid} hour={item} key={index} />
    );
  }

  render() {
    const { hours } = this.props.classes;
    return (
      <ScrollView style={styles.containerStyle}>

        <View style={styles.containerTopStyle}>
          <Text style={{ fontSize: 18 }}>
            {this.dateFormat()}
          </Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <TableDivision title='Horário' style={{ flex: 1, alignItems: 'flex-start' }} />
          <TableDivision title='Nº Alunos' flex={1} style={{ alignItems: 'flex-end' }} />
        </View>
        {this.renderHours(hours)}

      </ScrollView>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
  },
  containerTopStyle: {
    backgroundColor: '#fff',
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    elevation: 2,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
  },
  buttonStyle: {
    marginTop: 15,
    elevation: 2
  }
};

export default ClassView;
