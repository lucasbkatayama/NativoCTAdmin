import React, { Component } from 'react';
import firebase from 'firebase';
import _ from 'lodash';
import {
  Text,
  View,
  TouchableHighlight,
  CheckBox
} from 'react-native';
import { Icon } from 'react-native-elements';

class ClassViewHourItem extends Component {
  state = { content: false };

  onRowPress() {
    const { content } = this.state;

    if (content) this.setState({ content: false });
    else this.setState({ content: true });
  }

  markAttendance(uid) {
    const hour = this.props.hour.uid;
    const { date } = this.props;

    firebase.database().ref(`/classes/${date}/hours/${hour}/students/${uid}/`)
    .update({
      attendance: true
    });
  }

  renderStudents() {
    const students = _.map(this.props.hour.students, (val, uid) => {
      return { ...val, uid };
    });

    if (this.state.content) {
      return students.map((item, index) =>
        <View key={index} style={styles.studentsContentStyle}>
          <View style={{ paddingLeft: 10 }}>
            <Text>{item.name}</Text>
          </View>
          <View style={{ paddingRight: 20, flexDirection: 'row', alignItems: 'center' }}>
            <Text>Presença</Text>
            <CheckBox
              value={item.attendance}
              onChange={() => this.markAttendance(item.uid)}
            />
          </View>
        </View>
      );
    }
  }

  renderIcon() {
    if (this.state.content) {
      return (
        <Icon
          name='chevron-small-up'
          type='entypo'
          color='#517fa4'
        />
      );
    }
    return (
      <Icon
        name='chevron-small-down'
        type='entypo'
        color='#517fa4'
      />
    );
  }

  render() {
    const { students_limit, uid, students_total } = this.props.hour;

    return (
      <View>
        <TouchableHighlight style={{ height: 60 }} onPress={this.onRowPress.bind(this)}>
          <View style={styles.containerStyle}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={{ fontWeight: 'bold' }}>
                {uid}
              </Text>
            </View>
            <View style={{ flex: 2, justifyContent: 'center' }}>
              {this.renderIcon()}
            </View>
            <View style={styles.numberContainerStyle}>
              <Text>{students_total}</Text>
              <Text style={styles.titleStyle}>
                {'/' + students_limit}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
        {this.renderStudents()}
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    backgroundColor: '#fff'
  },
  titleStyle: {
    color: '#ccc',
  },
  numberContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  studentsContentStyle: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: 'rgba(0,0,0,0)',
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  }
};

export default ClassViewHourItem;
