import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, View, TouchableHighlight } from 'react-native';

class ClassItem extends Component {
  onRowPress() {
    Actions.classView({ classes: this.props.classes.item });
  }

  dateFormat() {
    const { uid } = this.props.classes.item;
    let dd = '' + new Date(parseInt(uid, 10)).getDate();
    let m = '' + (new Date(parseInt(uid, 10)).getMonth() + 1);
    const yyyy = new Date(parseInt(uid, 10)).getFullYear();
    if (m.length < 2) m = '0' + m;
    if (dd.length < 2) dd = '0' + dd;
    return (dd + '/' + m + '/' + yyyy);
  }

  render() {
    return (
        <TouchableHighlight onPress={this.onRowPress.bind(this)}>
          <View style={styles.containerStyle}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.titleStyle}>
                  {this.dateFormat()}
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
    backgroundColor: '#fff',
    height: 60,
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    paddingLeft: 20
  },
  columnStyle: {
    alignItems: 'center',
  },
  titleStyle: {
    color: 'black',
    fontWeight: 'bold'
  }
};

export default ClassItem;
