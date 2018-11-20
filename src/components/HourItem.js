import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import { exerciseFormChanged } from '../actions';

class HourItem extends Component {
  state = {
    status: '',
    modalTime1: false,
    modalTime2: false
   }

  formatHour(hour) {
    if (hour === '') return hour;
      let h = '' + hour;
      if (h.length < 2) h = '0' + h;
      return (h + ':00');
  }

  handleTimePicked1 = (time) => {
    const hour = time.getHours();
    if (this.props.period === 'morning') {
      this.props.exerciseFormChanged({ prop: 'morningInitialHour', value: hour });
    } else {
      this.props.exerciseFormChanged({ prop: 'eveningInitialHour', value: hour });
    }
    this.setState({ modalTime1: false });
  }

  handleTimePicked2 = (time) => {
    const hour = time.getHours();
    if (this.props.period === 'morning') {
      this.props.exerciseFormChanged({ prop: 'morningFinalHour', value: hour });
    } else {
      this.props.exerciseFormChanged({ prop: 'eveningFinalHour', value: hour });
    }
    this.setState({ modalTime2: false });
  }

  renderStartHour() {
    if (this.props.period === 'morning') {
      return this.formatHour(this.props.morningInitialHour);
    } return this.formatHour(this.props.eveningInitialHour);
  }

  renderEndHour() {
    if (this.props.period === 'morning') {
      return this.formatHour(this.props.morningFinalHour);
    } return this.formatHour(this.props.eveningFinalHour);
  }

  render() {
    return (
          <View style={styles.containerStyle}>
              <Text style={styles.titleStyle}>
                {this.props.title}
              </Text>
            <TouchableOpacity
              style={{ flexDirection: 'row' }}
              onPress={() => this.setState({ modalTime1: true })}
            >
              <View style={styles.hourContainerStyle}>
                <Text>
                  {this.renderStartHour()}
                </Text>
              </View>
              <Icon
                name='clock'
                color='#555'
                type='feather'
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: 'row' }}
              onPress={() => this.setState({ modalTime2: true })}
            >
              <View style={styles.hourContainerStyle}>
                <Text>
                  {this.renderEndHour()}
                </Text>
              </View>
              <Icon
                name='clock'
                color='#555'
                type='feather'
              />
            </TouchableOpacity>
              <DateTimePicker
                mode='time'
                isVisible={this.state.modalTime1}
                onConfirm={this.handleTimePicked1}
                onCancel={() => this.setState({ modalTime1: false })}
              />
              <DateTimePicker
                mode='time'
                isVisible={this.state.modalTime2}
                onConfirm={this.handleTimePicked2}
                onCancel={() => this.setState({ modalTime2: false })}
              />
          </View>
    );
  }
}

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    height: 40,
    flexDirection: 'row',
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center'
  },
  titleStyle: {
    color: '#555',
    fontWeight: 'bold',
    flex: 1
  },
  hourContainerStyle: {
    width: 85,
    alignItems: 'center',
  }
};

const mapStateToProps = state => {
  return {
    morningInitialHour: state.exercise.morningInitialHour,
    morningFinalHour: state.exercise.morningFinalHour,
    eveningInitialHour: state.exercise.eveningInitialHour,
    eveningFinalHour: state.exercise.eveningFinalHour,
    timeModal: state.exercise.timeModal
  };
};

export default connect(mapStateToProps, {
  exerciseFormChanged
})(HourItem);
