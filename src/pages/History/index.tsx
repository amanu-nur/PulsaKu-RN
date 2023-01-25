import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Transaction} from '../../components';
import {colors, fonts, getData} from '../../utils';
import {getDatabase, ref, onValue} from 'firebase/database';
import {Fire} from '../../config';

type PrivateProps = {
  navigation: any;
};

const History = ({navigation}: PrivateProps) => {
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState([]);
  const db = getDatabase(Fire);
  useEffect(() => {
    getData('user').then(res => setUser(res));
    getFire();
  }, [navigation]);

  const getFire = () => {
    const starCountRef = ref(db, 'history/');
    onValue(starCountRef, snapshot => {
      if (snapshot.val()) {
        const oldData = snapshot.val();
        const data = [];

        Object.keys(oldData).map(key => {
          data.push({
            ...oldData[key],
          });
        });

        setHistory(data);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Riwayat Transaksi</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flex: 1}}>
          {history
            .filter(e => e.fullname === user.fullname)
            .map((item, key) => {
              const data = {
                type: item.type,
                price: item.amount,
                date: item.date,
                fullname: item.fullname,
                transaction_id: item.transaction_id,
                phone: item.phone,
                status: item.status,
              };
              return (
                <Transaction
                  key={key}
                  type={item.type}
                  navigation={navigation}
                  price={item.amount}
                  date={item.date}
                  onPress={() => navigation.navigate('Invoice', data)}
                />
              );
            })}
        </View>
        <Text style={styles.desc}>Riwayat Transaksi</Text>
      </ScrollView>
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingHorizontal: 24,
    flex: 1,
    backgroundColor: colors.background.cream,
  },
  title: {
    color: colors.text.dark,
    fontFamily: fonts.primary[600],
    fontSize: 24,
  },
  desc: {
    fontSize: 12,
    fontFamily: fonts.primary[300],
    color: colors.text.secondary,
    textAlign: 'center',
    paddingVertical: 20,
  },
});
