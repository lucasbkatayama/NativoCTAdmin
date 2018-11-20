import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import { PersistGate } from 'redux-persist/integration/react';

import RouterAdmin from './src/RouterAdmin';
import { store, persistor } from './src/store';
import { key } from './src/config';

class App extends Component {
  componentWillMount() {
    const config = {
    apiKey: key.apiKey,
    authDomain: key.authDomain,
    databaseURL: key.databaseURL,
    projectId: key.projectId,
    storageBucket: key.storageBucket,
    messagingSenderId: key.messagingSenderId
    };
    firebase.initializeApp(config);
  }

  renderLoading = () => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size='large' />
    </View>
  );

  render() {
      return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={this.renderLoading()}>
          <View style={{ flex: 1, backgroundColor: '#ddd' }}>
            <RouterAdmin />
          </View>
        </PersistGate>
      </Provider>
      );
    }
}

export default App;
