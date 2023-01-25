import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IcLogo} from '../../assets';
import {Button, Gap} from '../../components';
import {colors, fonts, getData, showError, showSuccess} from '../../utils';
import {getDatabase, ref, set, push} from 'firebase/database';
import {Fire} from '../../config';
import {useDispatch} from 'react-redux';

type PrivateProps = {
  navigation: any;
};

const Bonus = ({navigation}: PrivateProps) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  useEffect(() => {
    getData('user').then(res => setUser(res));
  }, []);

  const Klaim = () => {
    dispatch({type: 'SET_LOADING', value: true});

    // Time
    const arrbulan = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'Mei',
      'Jun',
      'Jul',
      'Agu',
      'Sep',
      'Okt',
      'Nov',
      'Des',
    ];
    const date = new Date();
    const dates = `${date.getDate()} ${
      arrbulan[date.getMonth()]
    } ${date.getFullYear()} * ${date.getHours()}:${date.getMinutes()}`;

    const data = {
      fullname: user.fullname,
      phone: user.phone,
      amount: 50000,
      type: 'Bonus',
      status: 'Success',
      date: dates,
      transaction_id: `#PLS${(Math.random() + 1)
        .toString(36)
        .substring(7, 2)}-${(Math.random() + 1).toString(36).substring(7, 2)}`,
    };

    const db = getDatabase(Fire);
    push(ref(db, 'history/'), data)
      .then(() => {
        showSuccess('Bonus berhasil diambil');
        dispatch({type: 'SET_LOADING', value: false});
        navigation.replace('MainApp');
      })
      .catch(err => {
        showError(err.message);
        dispatch({type: 'SET_LOADING', value: false});
      });
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.card}>
          <View style={styles.cardHead}>
            <View>
              <Text style={styles.title}>Nama</Text>
              <Text style={styles.name}>{user?.fullname}</Text>
            </View>
            <IcLogo width={24} height={24} />
          </View>
          <Gap height={20} width={0} />
          <View>
            <Text style={styles.title}>Saldo</Text>
            <Text style={styles.name}>Rp 50.000</Text>
          </View>
        </View>
        <Gap height={80} width={0} />
        <View>
          <Text style={styles.notice}>Bonus 🎉</Text>
          <Text style={styles.desc}>
            Selamat kamu mendapatkan saldo pulsa sebesar Rp 50.000
          </Text>
        </View>
        <Gap height={50} width={0} />
        <Button title="Klaim" onPress={Klaim} />
      </View>
    </View>
  );
};

export default Bonus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.cream,
    paddingHorizontal: 38,
    paddingVertical: 30,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: colors.background.primary,
    padding: 24,
    borderRadius: 17,
  },
  cardHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
    color: colors.text.white,
    fontFamily: fonts.primary[300],
  },
  name: {
    fontSize: 20,
    color: colors.text.white,
    fontFamily: fonts.primary[400],
  },
  notice: {
    fontSize: 32,
    fontFamily: fonts.primary[700],
    color: colors.text.dark,
    textAlign: 'center',
  },
  desc: {
    fontSize: 14,
    color: colors.text.secondary,
    fontFamily: fonts.primary[300],
    textAlign: 'center',
  },
});
