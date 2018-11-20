import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, ScrollView, Picker } from 'react-native';
import _ from 'lodash';

import { classesFetch, exerciseFormChanged } from '../actions';
import { TableDivision } from './common';
import ClassItem from './ClassItem';


class ClassConsult extends Component {
  state = { period: 0 };

  componentDidMount() {
    this.props.classesFetch();
  }

  render() {
    return (
      <ScrollView>

        <View style={styles.topButtonStyle}>
          <Picker
            style={{ marginLeft: 20, flex: 1 }}
            selectedValue={this.state.period}
            onValueChange={period => {
              this.setState({ period });
              this.props.exerciseFormChanged({ prop: 'updateKey', value: Math.random() });
              console.log(this.props.updateKey);
            }}
          >
            <Picker.Item label="Desde o início" value={0} />
            <Picker.Item label="Últimos 30 dias" value={1} />
            <Picker.Item label="Últimos 60 dias" value={2} />
          </Picker>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <TableDivision title='Data' />
        </View>

        <FlatList
          data={this.props.classes.reverse()}
          renderItem={(e) => {
            switch (this.state.period) {
              case 1:
                if (e.item.uid >= new Date().getTime() - 2592000000) {
                  return <ClassItem classes={e} />;
                } break;
              case 2:
                if (e.item.uid >= new Date().getTime() - 5184000000) {
                  return <ClassItem classes={e} />;
                } break;
              default:
                return <ClassItem classes={e} />;
            }
          }}
          keyExtractor={classes => classes.uid}
        />

      </ScrollView>
    );
  }
}

const styles = {
  topButtonStyle: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    height: 40
  }
};

const mapStateToProps = state => {
  const classes = _.map(state.exercise.classes, (val, uid) => {
    return { ...val, uid };
  });
  
  return {
    classes,
    updateKey: state.exercise.updateKey
   };
};

export default connect(mapStateToProps, {
  classesFetch, exerciseFormChanged
})(ClassConsult);
