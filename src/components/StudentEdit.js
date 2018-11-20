import React, { Component } from 'react';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { View, Text, Modal } from 'react-native';
import { Button } from 'react-native-elements';

import Box from './common/Box';

class StudentEdit extends Component {
  state = {
    alertModal: false,
    disableDelete: false,
  };

  deleteStudent() {
    const { uid } = this.props.student;
    this.setState({ disableDelete: true });
    firebase.database().ref(`/users/${uid}`).remove()
    .then(() => Actions.pop());
  }

  mensalText(family_plan) {
    switch (family_plan) {
      case 'contribuinte':
        return 'Plano Familiar (Contribuinte)';
      case 'beneficiario':
        return 'Plano Familiar (Beneficiário)';
      default:
        return 'Não possui plano familiar';
    }
  }

  render() {
    const { s_email, name, phone, days, payPlan, family_plan, status, uid } = this.props.student;
    return (
      <View style={styles.containerStyle}>

        <Box icon={'person'} content={name} uid={uid} selected={'name'} editable />

        <Box icon={'email'} content={s_email} />

        <Box icon={'phone'} content={phone} uid={uid} selected={'phone'} editable />

        <Box icon={'today'} content={'Plano ' + payPlan + ', ' + days + ' vezes por semana'} />

        <Box icon={'people'} content={this.mensalText(family_plan)} />

        <Box icon={'payment'} content={'Em aberto'} />

        <Box icon={'info'} content={status} uid={uid} selected={'status'} editable />

        <Button
          fontWeight='600'
          rounded
          backgroundColor='red'
          title='Excluir Aluno'
          onPress={() => this.setState({ alertModal: true })}
          buttonStyle={{ elevation: 2, marginTop: 10 }}
        />

        <Modal
            transparent
            visible={this.state.alertModal}
            onRequestClose={() => this.setState({ alertModal: false })}
        >
          <View style={styles.modalContainerStyle}>
            <View style={styles.modalStyle}>
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.modalTitleTextStyle}>
                  Alerta
                </Text>
                <Text style={{ marginBottom: 10 }}>
                  Deseja mesmo excluir esse aluno?
                </Text>
              </View>
              <Button
                title='OK'
                disabled={this.state.disableDelete}
                buttonStyle={{ marginTop: 5 }}
                backgroundColor='red'
                rounded
                onPress={() => {
                  this.deleteStudent();
                }}
              />
              <Button
                title='Cancelar'
                buttonStyle={{ marginTop: 5 }}
                backgroundColor='#ccc'
                rounded
                onPress={() => {
                  this.setState({ alertModal: false });
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
    flex: 1,
    justifyContent: 'center',
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

export default StudentEdit;
