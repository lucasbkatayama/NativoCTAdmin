import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

import { billsFetch } from '../actions';
import { TableDivision } from './common';
import BillsItem from './BillsItem';


class FinancialManagement extends Component {
  componentWillMount() {
    this.props.billsFetch();
  }

  render() {
    return (
      <ScrollView>

        <View style={styles.topButtonStyle}>
          <Button
            fontWeight='600'
            title='Consultar Pagamentos'
            rounded
            backgroundColor='#007aff'
            icon={{ name: 'history' }}
            buttonStyle={{ elevation: 2 }}
            onPress={() => Actions.studentCreate()}
          />
        </View>

        <View style={{ flexDirection: 'row' }}>
          <TableDivision title='Pagamentos em aberto' style={{ flex: 4, alignItems: 'flex-start' }} />
          <TableDivision title='Status' flex={1} />
        </View>

        <FlatList
          data={this.props.bills}
          renderItem={(e) => {
            if (!e.item.payed) return <BillsItem bills={e} />;
          }}
          keyExtractor={bills => bills.uid}
        />

      </ScrollView>
    );
  }
}

const styles = {
  topButtonStyle: {
    paddingTop: 5,
    paddingBottom: 5,
    height: 70,
    backgroundColor: 'white',
    elevation: 2,
    justifyContent: 'space-around'
  }
};

const mapStateToProps = state => {
  const bills = _.map(state.student.bills, (val, uid) => {
    return { ...val, uid };
  });
  return { bills };
};

export default connect(mapStateToProps, { billsFetch })(FinancialManagement);
