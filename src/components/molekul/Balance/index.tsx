import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../../utils';

type PrivateProps = {
  name: string;
  wallet: number;
};

const Balance = ({name, wallet}: PrivateProps) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.balance}>Halo {name},</Text>
        <Text style={styles.desc}>Sisa saldo kamu sekarang.</Text>
      </View>
      <Text style={styles.balance}>Rp {wallet}</Text>
    </View>
  );
};

export default Balance;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balance: {
    fontSize: 18,
    fontFamily: fonts.primary[600],
    color: colors.text.dark,
  },
  desc: {
    fontSize: 12,
    fontFamily: fonts.primary[300],
    color: colors.text.secondary,
  },
});
