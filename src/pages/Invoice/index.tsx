import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Gap, Header} from '../../components';
import {colors, fonts} from '../../utils';

type PrivateProps = {
  navigation: any;
  route: any;
};

const Invoice = ({navigation, route}: PrivateProps) => {
  const data = route.params;
  return (
    <>
      <Header navigation={navigation} type="back" />
      <View style={styles.container}>
        <View style={styles.body}>
          <View style={styles.top}>
            <Image
              style={{width: 40, height: 40}}
              source={{
                uri: 'https://reactnative.dev/img/tiny_logo.png',
              }}
            />
            <Gap height={20} width={0} />
            <View style={{alignItems: 'center'}}>
              <Text style={styles.title}>{data.type}</Text>
              <Text style={styles.status}>{data.status}</Text>
            </View>
          </View>
          <View style={styles.bodyDetail}>
            <Text style={styles.title}>Detail Pembayaran</Text>
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>Total Pembayaran</Text>
              <Text style={styles.rowDesc}>
                Rp{Intl.NumberFormat('id-ID').format(data.price)}
              </Text>
            </View>
          </View>
          <View style={styles.bodyDetail}>
            <Text style={styles.title}>Detail Transaksi</Text>
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>Nama Lengkap</Text>
              <Text style={styles.rowDesc}>{data.fullname}</Text>
            </View>
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>Nomor HP</Text>
              <Text style={styles.rowDesc}>{data.phone}</Text>
            </View>
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>Transaksi ID</Text>
              <Text style={styles.rowDesc}>{data.transaction_id}</Text>
            </View>
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>Waktu</Text>
              <Text style={styles.rowDesc}>{data.date}</Text>
            </View>
          </View>
        </View>
        <Gap height={20} width={0} />
      </View>
    </>
  );
};

export default Invoice;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 24,
    flex: 1,
    backgroundColor: colors.background.cream,
  },
  body: {
    backgroundColor: colors.background.white,
    padding: 15,
    borderRadius: 10,
  },
  top: {
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.primary[600],
    color: colors.text.dark,
  },
  status: {
    fontSize: 14,
    fontFamily: fonts.primary[400],
    color: colors.text.success,
  },

  bodyDetail: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.secondary,
    gap: 5,
  },
  rowText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowTitle: {
    fontFamily: fonts.primary[600],
    color: colors.text.dark,
  },
  rowDesc: {
    fontFamily: fonts.primary[300],
    color: colors.text.secondary,
  },
});
