import React, { Component } from 'react';
import _ from 'lodash';
import {
  View,
  Keyboard,
  Platform,
  Modal,
  Text,
  Picker,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button,
} from 'react-native-elements';
import {
  studentCreate,
  modalVisibility,
  formChanged,
  contributorsFetch
} from '../actions';

class StudentForm extends Component {
  state = { sponsorNumber: 0 };

  componentWillMount() {
    this.props.contributorsFetch();
  }

  onButtonPress() {
    const {
      s_email,
      s_password,
      name,
      phone,
      days,
      plan,
      family_plan,
      contributors,
      parcel,
      parcel_number
    } = this.props;
    const { sponsorNumber } = this.state;
    if (contributors[0] != null) {
      const contributor = contributors[sponsorNumber];

      this.props.studentCreate({
        s_email, s_password, name, phone, days, plan, family_plan, contributor, parcel, parcel_number
      });
      Keyboard.dismiss();
    }
    this.props.studentCreate({
      s_email, s_password, name, phone, days, plan, family_plan, parcel, parcel_number
    });
    Keyboard.dismiss();
  }

  renderError() {
    if (this.props.s_error) {
      return (
        <FormValidationMessage>
          {this.props.s_error}
        </FormValidationMessage>
      );
    }
  }

  renderPickers() {
    if (this.props.family_plan === 'beneficiario') {
      return (
        <View>
          <FormLabel>Responsável:</FormLabel>
            <Picker
              style={{ marginLeft: 20, flex: 1 }}
              selectedValue={this.state.sponsorNumber}
              onValueChange={(value) =>
                this.setState({ sponsorNumber: value
              })}
            >
            {this.props.contributors.map((item, index) => {
              return (
                <Picker.Item label={item.sponsor} value={index} key={item.uid} />
              );
            })}
            </Picker>
        </View>
      );
  }
  return (
    <View>
      <FormLabel>Pacote:</FormLabel>
        <Picker
          style={{ marginLeft: 20, flex: 1 }}
          selectedValue={this.props.plan}
          onValueChange={value => this.props.formChanged({ prop: 'plan', value })}
        >
          <Picker.Item label="Mensal" value='Mensal' />
          <Picker.Item label="Semestral" value='Semestral' />
          <Picker.Item label="Anual" value='Anual' />
        </Picker>
      </View>
  );
}

renderParcelPicker() {
  if (this.props.plan === 'Semestral' || this.props.plan === 'Anual') {
    return (
      <View>
        <FormLabel>Forma de Pagamento:</FormLabel>
          <Picker
            style={{ marginLeft: 20, flex: 1 }}
            selectedValue={this.props.parcel}
            onValueChange={value => this.props.formChanged({ prop: 'parcel', value })}
          >
            <Picker.Item label="A Vista" value={false} />
            <Picker.Item label="A Prazo" value />
          </Picker>
        </View>
    );
  } return <View />;
}

renderParcelNumberPicker() {
  if (this.props.parcel && this.props.plan === 'Semestral') {
    return (
      <View>
        <FormLabel>Numero de Parcelas:</FormLabel>
          <Picker
            style={{ marginLeft: 20, flex: 1 }}
            selectedValue={this.props.parcel_number}
            onValueChange={value => this.props.formChanged({ prop: 'parcel_number', value })}
          >
            <Picker.Item label="2" value={2} />
            <Picker.Item label="3" value={3} />
          </Picker>
        </View>
    );
  } else if (this.props.parcel && this.props.plan === 'Anual') {
    return (
      <View>
        <FormLabel>Numero de Parcelas:</FormLabel>
          <Picker
            style={{ marginLeft: 20, flex: 1 }}
            selectedValue={this.props.parcel_number}
            onValueChange={value => this.props.formChanged({ prop: 'parcel_number', value })}
          >
            <Picker.Item label="2" value={2} />
            <Picker.Item label="3" value={3} />
            <Picker.Item label="4" value={4} />
            <Picker.Item label="5" value={5} />
            <Picker.Item label="6" value={6} />
          </Picker>
        </View>
    );
  } return <View />;
}

  renderButton() {
    if (this.props.s_loading) {
      return (
        <Button
          backgroundColor='red'
          loading
          containerViewStyle={{ marginTop: 10, marginBottom: 10 }}
          rounded
        />
      );
    }
    return (
      <Button
        containerViewStyle={{ marginTop: 10, marginBottom: 10 }}
        title='CADASTRAR'
        backgroundColor='red'
        onPress={this.onButtonPress.bind(this)}
        rounded
      />
    );
  }

  render() {
    return (
      <KeyboardAwareScrollView
        enableOnAndroid
        enableAutomaticScroll
        keyboardOpeningTime={0}
        style={styles.containerStyle}
        extraHeight={Platform.select({ android: 200 })}
        keyboardShouldPersistTaps='always'
      >

          <FormLabel>Nome Completo:</FormLabel>
          <FormInput
            value={this.props.name}
            onChangeText={value => this.props.formChanged({ prop: 'name', value })}
            containerStyle={{ borderBottomWidth: 1, borderBottomColor: '#ddd' }}
          />

          <FormLabel>Telefone:</FormLabel>
          <FormInput
            onChangeText={value => this.props.formChanged({ prop: 'phone', value })}
            value={this.props.phone}
            keyboardType='numeric'
            containerStyle={{ borderBottomWidth: 1, borderBottomColor: '#ddd' }}
          />

          <FormLabel>Email:</FormLabel>
          <FormInput
            onChangeText={value => this.props.formChanged({ prop: 's_email', value })}
            value={this.props.s_email}
            autoCapitalize='none'
            placeholder='exemplo@exemplo.com'
            containerStyle={{ borderBottomWidth: 1, borderBottomColor: '#ddd' }}
          />

          <FormLabel>Senha:</FormLabel>
          <FormInput
            secureTextEntry
            onChangeText={value => this.props.formChanged({ prop: 's_password', value })}
            value={this.props.s_password}
            containerStyle={{ borderBottomWidth: 1, borderBottomColor: '#ddd' }}
          />

        <FormLabel>Pacote Famíliar:</FormLabel>
          <Picker
            style={{ marginLeft: 20, flex: 1 }}
            selectedValue={this.props.family_plan}
            onValueChange={value => {
                this.props.formChanged({ prop: 'family_plan', value });
                if (value === 'beneficiario' && this.props.contributors !== 'undefined') {
                  this.props.formChanged({
                    prop: 'sponsor',
                    value: this.props.contributors !== 'undefined' ? this.props.contributors[0] : ''
                  });
                } this.props.formChanged({
                    prop: 'sponsor',
                    value: ''
                  });
              }
            }
          >
            <Picker.Item label="Não" value='no' />
            <Picker.Item label="Contribuinte" value='contribuinte' />
            <Picker.Item label="Beneficiário" value='beneficiario' />
          </Picker>
          <FormLabel>Aulas/Semana:</FormLabel>
            <Picker
              style={{ marginLeft: 20, flex: 1 }}
              selectedValue={this.props.days}
              onValueChange={value => this.props.formChanged({ prop: 'days', value })}
            >
              <Picker.Item label="2 dias" value={2} />
              <Picker.Item label="3 dias" value={3} />
              <Picker.Item label="6 dias" value={6} />
            </Picker>
          {this.renderPickers()}
          {this.renderParcelPicker()}
          {this.renderParcelNumberPicker()}
          {this.renderError()}
          {this.renderButton()}

        <Modal
            transparent
            visible={this.props.modal}
            onRequestClose={() => this.props.modalVisibility(false)}
        >
            <View style={styles.modalContainerStyle}>
              <View style={styles.modalStyle}>
                <View style={{ alignItems: 'center' }}>
                  <Text style={styles.modalTitleTextStyle}>
                    Sucesso
                  </Text>
                  <Text style={{ marginBottom: 10 }}>
                    Aluno cadastrado
                  </Text>
                </View>
                <Button
                  title='OK'
                  backgroundColor='red'
                  rounded
                  onPress={() => {
                    this.props.modalVisibility(false);
                  }}
                />
              </View>
            </View>
          </Modal>

      </KeyboardAwareScrollView>
    );
  }
}

const styles = {
  containerStyle: {
    backgroundColor: '#fff',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
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

const mapStateToProps = state => {
  const contributors = _.map(state.student.contributors, (val, uid) => {
    return { ...val, uid };
  });
  return {
    s_email: state.student.s_email,
    s_password: state.student.s_password,
    name: state.student.name,
    phone: state.student.phone,
    days: state.student.days,
    s_error: state.student.s_error,
    s_loading: state.student.s_loading,
    modal: state.student.modal,
    plan: state.student.plan,
    family_plan: state.student.family_plan,
    sponsor: state.student.sponsor,
    contributors,
    parcel: state.student.parcel,
    parcel_number: state.student.parcel_number
  };
};

export default connect(mapStateToProps, {
  studentCreate,
  modalVisibility,
  formChanged,
  contributorsFetch
})(StudentForm);
