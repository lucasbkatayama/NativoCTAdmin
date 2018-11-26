import React, { Component } from 'react';
import _ from 'lodash';
import { Text, View, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';

class ClassViewHourItem extends Component {
  state = { content: false };

  onRowPress() {
    const { content } = this.state;

    if (content) this.setState({ content: false });
    else this.setState({ content: true });
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
          <View style={{ paddingRight: 20 }}>
            <Text>{item.attendance}654654</Text>
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
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
};

export default ClassViewHourItem;
