import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IcGif, IcPulsa, IcTf, IcTopupActive} from '../../../assets';
import {colors, fonts} from '../../../utils';

type PrivateProps = {
  onPress: any;
  type: string;
  price: any;
  date: any;
};

const Transaction = ({onPress, type, price, date}: PrivateProps) => {
  const Icon = () => {
    if (type === 'Bonus') return <IcGif width={20} height={20} />;
    if (type === 'Buy') return <IcPulsa width={20} height={20} />;
    if (type === 'Transfer') return <IcTf width={20} height={20} />;
    return <IcTopupActive width={20} height={20} />;
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.left}>
        <View style={styles.bodyLogo}>
          <Icon />
        </View>
        <View>
          <Text style={styles.name}>{type}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
      <Text style={styles.amount}>
        {type === 'Bonus' || type === 'Topup' ? '+' : '-'}Rp
        {Intl.NumberFormat('id-ID').format(price)}
      </Text>
    </TouchableOpacity>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: colors.border.secondary,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  bodyLogo: {
    padding: 10,
    backgroundColor: colors.background.white,
    borderRadius: 10,
  },
  name: {
    fontSize: 14,
    fontFamily: fonts.primary[600],
    color: colors.text.dark,
  },
  date: {
    fontSize: 10,
    fontFamily: fonts.primary[300],
    color: colors.text.secondary,
  },
  amount: {
    fontSize: 14,
    fontFamily: fonts.primary[600],
    color: colors.text.dark,
  },
});
