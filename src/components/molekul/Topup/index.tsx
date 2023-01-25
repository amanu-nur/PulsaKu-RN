import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IcHis, IcSend, IcTopup} from '../../../assets';
import {colors, fonts} from '../../../utils';

type PrivateProps = {
  navigation: any;
  Topup: any;
  Transfer: any;
};

const Topup = ({navigation, Topup, Transfer}: PrivateProps) => {
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.btn} onPress={Topup}>
          <IcTopup width={24} height={24} />
          <Text style={styles.title}>Topup</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={Transfer}>
          <IcSend width={24} height={24} />
          <Text style={styles.title}>Transfer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('History')}>
          <IcHis width={24} height={24} />
          <Text style={styles.title}>History</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Topup;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.primary,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btn: {
    marginTop: 5,
    flex: 1,
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  title: {
    marginTop: 5,
    fontSize: 12,
    fontFamily: fonts.primary[600],
    color: colors.text.white,
  },
});
