import React, { Component } from 'react';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { Button } from 'react-native-elements';
import { Text, View, TouchableHighlight, Modal } from 'react-native';

class BillsItem extends Component {
  state = { color: '#000', modal: false };

  componentWillMount() {
    const { uid, id, expiration_date, payPlan, days } = this.props.bills.item;
    let value;

    if (expiration_date < 200000000000000000000) {
      this.setState({ color: 'red' });

      if (payPlan === 'Mensal') {
        firebase.database().ref(`/payments/values/${payPlan}/${days}`)
          .on('value', snapshot => {
            value = snapshot.val().late;
            firebase.database().ref(`/payments/bills/${uid}`).update({ value });
            firebase.database().ref(`/users/${id}/${expiration_date}`)
              .update({ value });
          });
      }
      firebase.database().ref(`/payments/bills/${uid}`).update({ status: 'Atrasado' });
      firebase.database().ref(`/users/${id}/${expiration_date}`)
        .update({ status: 'Atrasado' });
    }
  }

  onRowPress() {
    this.setState({ modal: true });
  }

  acceptPayment() {
    const { uid, id, expiration_date } = this.props.bills.item;
    const update = { status: 'Pago', pay_date: (Date.now()) };

    firebase.database().ref(`/payments/bills/${uid}`)
    .update({
      payed: true,
      status: 'Pago',
       pay_date: (Date.now())
    });
    firebase.database().ref(`/users/${id}/${expiration_date}`).update({ update });
    this.setState({ modal: false });
  }

  dateFormat(uid) {
    let dd = '' + new Date(parseInt(uid, 10)).getDate();
    let m = '' + (new Date(parseInt(uid, 10)).getMonth() + 1);
    const yyyy = new Date(parseInt(uid, 10)).getFullYear();
    if (m.length < 2) m = '0' + m;
    if (dd.length < 2) dd = '0' + dd;
    return (dd + '/' + m + '/' + yyyy);
  }

  render() {
    const { name, expiration_date, status, value } = this.props.bills.item;
    return (
        <TouchableHighlight onPress={this.onRowPress.bind(this)}>

          <View style={styles.containerStyle}>
            <View style={{ flex: 4, justifyContent: 'center' }}>
                <Text style={[styles.titleStyle, { fontWeight: 'bold' }]}>
                  {name}
                </Text>
                <Text style={{ color: '#555' }}>
                  {'Valor: '}{value},00</Text>
                  <Text style={{ color: '#555' }}>
                    {'Vencimento: '}{this.dateFormat(expiration_date)}
                </Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: this.state.color }}>
                  {status}
                </Text>
            </View>

            <Modal
                transparent
                visible={this.state.modal}
                onRequestClose={() => this.setState({ modal: false })}
            >
                <View style={styles.modalContainerStyle}>
                  <View style={styles.modalStyle}>
                    <View style={{ alignItems: 'center' }}>
                      <Text style={styles.modalTitleTextStyle}>
                        Alerta
                      </Text>
                      <Text style={{ marginBottom: 10 }}>
                        Essa conta foi paga?
                      </Text>
                    </View>

                    <Button
                      title='Ok'
                      backgroundColor='red'
                      rounded
                      onPress={() => this.acceptPayment()}
                    />
                    <Button
                      title='Cancelar'
                      buttonStyle={{ marginTop: 5 }}
                      rounded
                      onPress={() => {
                        this.setState({ modal: false });
                      }}
                    />
                  </View>
                </View>
              </Modal>

          </View>
        </TouchableHighlight>
    );
  }
}

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    height: 60,
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    paddingLeft: 20,
    backgroundColor: '#fff'
  },
  titleStyle: {
    color: 'black',
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

export default BillsItem;
