import React from 'react';
import { View, Text } from 'react-native';

const TableDivision = ({ title, style, fontSize }) => {
  return (
    <View style={[styles.containerStyle, style]}>
      <Text style={[{ fontSize: 18 }, fontSize]}>{title}</Text>
    </View>
  );
};

const styles = {
  containerStyle: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 60,
    flex: 1,
    padding: 5,
  }
};

export { TableDivision };
