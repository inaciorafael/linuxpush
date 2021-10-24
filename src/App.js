import React, {useEffect, useState} from 'react';
import {View, Text, StatusBar} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import NetInfo from '@react-native-community/netinfo';

import {InternetOff} from './components';

const App = () => {
  const [netInfo, setNetInfo] = useState(0);

  useEffect(() => {
    NetInfo.fetch().then(state => {
      setNetInfo(state);
    });

    const unsubscribe = NetInfo.addEventListener(state => {
      setNetInfo(state);
    });

    return () => unsubscribe();
  }, []);

  if (!netInfo.isConnected) {
    return <InternetOff />;
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#F983BA" barStyle="light-content" />
      <Text style={[styles.text, styles.bold]}>
        Conectado a internet e pronto para receber notificações
      </Text>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    backgroundColor: '#F9F9F9',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    color: '#3B4252',
    fontSize: '15@s',
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default App;
