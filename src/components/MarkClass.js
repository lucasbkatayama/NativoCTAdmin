import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import {
  FormLabel,
  FormValidationMessage,
  Button,
  Icon
} from 'react-native-elements';
import { connect } from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';

import { exerciseFormChanged, markClass } from '../actions';
import HourItem from './HourItem';
import { TableDivision } from './common';

class MarkClass extends Component {
  handleDatePicked = (date) => {
    this.props.exerciseFormChanged({ prop: 'date', value: date });
    this.props.exerciseFormChanged({ prop: 'dateModal', value: false });
  }

  renderButton() {
    const {
      date,
      morningInitialHour,
      morningFinalHour,
      eveningInitialHour,
      eveningFinalHour
    } = this.props;

    if (date === '') {
      return (
        <Button
          buttonStyle={{ marginTop: 10 }}
          title='MARCAR AULA'
          disabled
          rounded
        />
      );
    }
    return (
      <Button
        title='MARCAR AULA'
        backgroundColor='red'
        rounded
        buttonStyle={{ marginTop: 10 }}
        onPress={() => {
          const hoursAvailable = {};

          for (let i = morningInitialHour; i < morningFinalHour; i++) {
            hoursAvailable[i + ':00'] = {};
            hoursAvailable[i + ':00'].students_limit = 15;
            hoursAvailable[i + ':00'].students_total = 0;
          }
          for (let i = eveningInitialHour; i < eveningFinalHour; i++) {
            hoursAvailable[i + ':00'] = {};
            hoursAvailable[i + ':00'].students_limit = 15;
            hoursAvailable[i + ':00'].students_total = 0;
          }
          this.props.markClass(date, hoursAvailable);
        }}
      />
    );
  }

  renderDate() {
    const { date } = this.props;
    const choice = new Date(date);
    let dd = '' + choice.getDate();
    let m = '' + (choice.getMonth() + 1);
    const yyyy = choice.getFullYear();
    if (m.length < 2) m = '0' + m;
    if (dd.length < 2) dd = '0' + dd;
    if (isNaN(dd)) return '';
    return (dd + '/' + m + '/' + yyyy);
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.containerStyle}>
          {this.renderButton()}
          <FormLabel>Data:</FormLabel>
            <TouchableOpacity
              style={styles.datePickerContainerStyle}
              onPress={() =>
                this.props.exerciseFormChanged({ prop: 'dateModal', value: true })
           }>
              <View style={styles.datePickerStyle}>
                <Text>{this.renderDate()}</Text>
              </View>
              <Icon
                name='calendar'
                type='font-awesome'
                color='#007aff'
              />
            </TouchableOpacity>

          <FormLabel>Horários</FormLabel>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: 80, borderBottomWidth: 1, borderBottomColor: '#ddd' }} />
            <TableDivision fontSize={{ fontSize: 14 }} title='Começo' />
            <TableDivision fontSize={{ fontSize: 14 }} style={{ flex: 2 }} title='Fim' />
          </View>
          <HourItem period='morning' title='Manhã:' />
          <HourItem title='Tarde:' />

          <DateTimePicker
            isVisible={this.props.dateModal}
            onConfirm={this.handleDatePicked}
            onCancel={() =>
              this.props.exerciseFormChanged({ prop: 'dateModal', value: false })
            }
          />
        </View>
      </ScrollView>
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
    elevation: 2,
    flex: 1
  },
  datePickerContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  datePickerStyle: {
    alignItems: 'center',
    width: 120,
    borderBottomWidth: 1,
    margin: 10,
    padding: 5
  }
};

const mapStateToProps = state => {
  return {
    morningInitialHour: state.exercise.morningInitialHour,
    morningFinalHour: state.exercise.morningFinalHour,
    eveningInitialHour: state.exercise.eveningInitialHour,
    eveningFinalHour: state.exercise.eveningFinalHour,
    date: state.exercise.date,
    dateModal: state.exercise.dateModal,
    timeModal: state.exercise.timeModal,
    updateKey: state.exercise.updateKey
  };
};

export default connect(mapStateToProps, {
  exerciseFormChanged, markClass
 })(MarkClass);
