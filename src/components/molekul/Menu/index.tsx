import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../../utils';
import {
  IcAll,
  IcBill,
  IcGif,
  IcInternet,
  IcPulsa,
  IcToko,
} from '../../../assets';
import {Gap} from '../../atom';

type PrivateProps = {
  onPress: any;
};

const Menu = ({onPress}: PrivateProps) => {
  return (
    <View>
      <Text style={styles.title}>Menu</Text>
      <View style={styles.menu}>
        <TouchableOpacity style={styles.bodybtn} onPress={onPress}>
          <View style={styles.icbtn}>
            <IcPulsa width={20} height={20} />
          </View>
          <Text style={styles.titlemenu}>Pulsa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bodybtn}
          onPress={() => alert('Coming Soon')}>
          <View style={styles.icbtn}>
            <IcGif width={20} height={20} />
          </View>
          <Text style={styles.titlemenu}>Kirim Hadiah</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bodybtn}
          onPress={() => alert('Coming Soon')}>
          <View style={styles.icbtn}>
            <IcToko width={20} height={20} />
          </View>
          <Text style={styles.titlemenu}>Merchant</Text>
        </TouchableOpacity>
      </View>
      <Gap height={15} width={0} />
      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.bodybtn}
          onPress={() => alert('Coming Soon')}>
          <View style={styles.icbtn}>
            <IcInternet width={20} height={20} />
          </View>
          <Text style={styles.titlemenu}>Internet</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bodybtn}
          onPress={() => alert('Coming Soon')}>
          <View style={styles.icbtn}>
            <IcBill width={20} height={20} />
          </View>
          <Text style={styles.titlemenu}>Nota</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bodybtn}
          onPress={() => alert('Coming Soon')}>
          <View style={styles.icbtn}>
            <IcAll width={20} height={20} />
          </View>
          <Text style={styles.titlemenu}>Lainnya</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontFamily: fonts.primary[600],
    color: colors.text.dark,
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bodybtn: {
    alignItems: 'center',
    flex: 1,
  },
  icbtn: {
    padding: 10,
    backgroundColor: colors.background.white,
    borderRadius: 5,
    marginBottom: 4,
  },
  titlemenu: {
    fontFamily: fonts.primary[600],
    fontSize: 12,
    color: colors.text.dark,
  },
});
