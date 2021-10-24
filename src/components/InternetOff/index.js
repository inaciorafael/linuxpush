import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

const InternetOff = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#F983BA" barStyle="light-content" />
      <Text style={[styles.text, styles.bold]}>
        Você não está conectado a internet
      </Text>
      <View style={{height: 10}} />
      <Text style={styles.text}>
        Quando a conexão com a internet for restabelecida você voltara a receber
        notificações
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
    padding: '10@s',
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

export default InternetOff;
