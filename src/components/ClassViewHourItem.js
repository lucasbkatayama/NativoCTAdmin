import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';

class ClassViewHourItem extends Component {
  state = { content: false };

  onRowPress() {
    const { content } = this.state;

    if (content) this.setState({ content: false });
    else this.setState({ content: true });
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
    const { students_limit, uid } = this.props.hour;

    return (
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
              <Text>0</Text>
              <Text style={styles.titleStyle}>
                {'/' + students_limit}
              </Text>
            </View>
          </View>
        </TouchableHighlight>

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
  columnStyle: {
    alignItems: 'center',
  },
  titleStyle: {
    color: '#ccc',
  },
  numberContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export default ClassViewHourItem;
