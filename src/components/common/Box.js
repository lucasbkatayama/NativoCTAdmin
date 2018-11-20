import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Icon, Button, FormInput } from 'react-native-elements';

import { studentsFetch } from '../../actions';

class Box extends Component {
  state = {
    editModal: false,
    value: '',
    selected: '',
   };

  editStudent() {
    const { uid, selected } = this.props;
    const { value } = this.state;
    let updates = {};
    updates[`/users/${uid}/${selected}`] = value;
    this.setState({ disableDelete: true });
    firebase.database().ref().update(updates).then(() => {
      this.props.studentsFetch();
      this.setState({ editModal: false });
    });
  }

  renderPencilButton() {
    if (this.props.editable) {
      return (
        <TouchableOpacity onPress={() => this.setState({ editModal: true })}>
          <Icon
            containerStyle={{ marginRight: 15 }}
            name='pencil'
            type='foundation'
          />
        </TouchableOpacity>
      );
    }
  }

  render() {
    return (
      <View>
        <View style={styles.containerStyle}>
          <View style={{ width: 40 }}>
            <Icon
              containerStyle={{ marginRight: 15 }}
              name={this.props.icon}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text>{this.props.content}</Text>
          </View>
          {this.renderPencilButton()}
        </View>

      <Modal
          transparent
          visible={this.state.editModal}
          onRequestClose={() => this.setState({ editModal: false })}
      >
          <View style={styles.modalContainerStyle}>
            <View style={styles.modalStyle}>
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.modalTitleTextStyle}>
                  Editar
                </Text>
                <FormInput
                  onChangeText={value => this.setState({ value })}
                  value={this.state.value}
                  containerStyle={{ width: 250, borderBottomWidth: 1, borderBottomColor: '#ddd' }}
                />
              </View>
              <Button
                title='OK'
                disabled={this.state.disableDelete}
                buttonStyle={{ marginTop: 20 }}
                backgroundColor='red'
                rounded
                onPress={() => {
                  this.editStudent();
                }}
              />
              <Button
                title='Cancelar'
                buttonStyle={{ marginTop: 5 }}
                backgroundColor='#ccc'
                rounded
                onPress={() => {
                  this.setState({ editModal: false });
                }}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    backgroundColor: '#fff',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 2,
    borderRadius: 10,
    flexDirection: 'row',
    padding: 10,
    elevation: 2
  },
  modalContainerStyle: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalStyle: {
    backgroundColor: '#fff',
    elevation: 2,
    justifyContent: 'space-around',
    borderRadius: 5,
    paddingBottom: 10,
    width: 275
  },
  modalTitleTextStyle: {
    fontSize: 16,
    color: '#888',
    margin: 20
  }
};

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, {
  studentsFetch
})(Box);
