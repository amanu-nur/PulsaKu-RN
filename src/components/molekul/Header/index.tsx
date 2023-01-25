import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IcBack, IcClose, IcLogo, IcLogout} from '../../../assets';
import {colors, fonts} from '../../../utils';

type PrivateProps = {
  navigation: any;
  type: string;
  onPress: any;
  title: any;
};

const Header = ({navigation, type, onPress, title}: PrivateProps) => {
  if (type === 'back') {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.goBack()}>
          <IcBack width={15} height={15} />
        </TouchableOpacity>
        <Text style={styles.name}>Invoice</Text>
      </View>
    );
  }

  if (type === 'modal') {
    return (
      <View style={styles.container}>
        <Text style={styles.name}>{title}</Text>
        <TouchableOpacity style={styles.btnClose} onPress={onPress}>
          <IcClose width={15} height={15} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
        <View style={styles.logo}>
          <IcLogo width={18} height={18} />
        </View>
        <Text style={styles.name}>Pulsaku</Text>
      </View>
      <TouchableOpacity onPress={onPress}>
        <IcLogout />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.background.white,
    paddingHorizontal: 24,
    paddingVertical: 30,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  name: {
    fontSize: 18,
    fontFamily: fonts.primary[600],
    color: colors.text.dark,
    maxWidth: 190,
  },
  logo: {
    backgroundColor: colors.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 10,
  },
  btn: {
    backgroundColor: colors.background.secondary,
    padding: 10,
    borderRadius: 5,
  },
  btnClose: {
    backgroundColor: colors.background.cream,
    padding: 10,
    borderRadius: 5,
  },
});
