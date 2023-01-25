import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../../utils';

type PrivateProps = {
  title: string;
  onPress: any;
  type: string;
  active: any;
};

const Button = ({title, onPress, type, active}: PrivateProps) => {
  if (type === 'pulsa') {
    return (
      <TouchableOpacity style={styles.btnPulsa(active)} onPress={onPress}>
        <Text style={styles.titlePulsa(active)}>{title}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.button.primary,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.primary[600],
    textAlign: 'center',
    color: colors.text.white,
  },

  btnPulsa: active => ({
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: active ? colors.border.primary : colors.border.secondary,
    borderRadius: 5,
    borderWidth: 1,
  }),

  titlePulsa: active => ({
    fontSize: 14,
    fontFamily: fonts.primary[400],
    color: active ? colors.text.primary : colors.text.secondary,
  }),
});
