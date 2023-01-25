import {ScrollView, StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {DumyPromo} from '../../../dumy';
import {Gap} from '../../atom';
import {colors, fonts} from '../../../utils';

const Promo = () => {
  return (
    <View>
      <Text style={styles.title}>Promo & Diskon</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.rowPromo}>
          <Image
            source={DumyPromo}
            style={{height: 120, width: 300, borderRadius: 10}}
          />
          <Image
            source={DumyPromo}
            style={{height: 120, width: 300, borderRadius: 10}}
          />
          <Image
            source={DumyPromo}
            style={{height: 120, width: 300, borderRadius: 10}}
          />
          <Image
            source={DumyPromo}
            style={{height: 120, width: 300, borderRadius: 10}}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Promo;

const styles = StyleSheet.create({
  rowPromo: {
    flexDirection: 'row',
    gap: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.primary[600],
    color: colors.text.dark,
  },
});
