import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../../utils';

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.text.primary} size={'large'} />
      <Text style={styles.loading}>Loading...</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: '100%',
    height: '100%',
  },
  loading: {
    fontSize: 18,
    fontFamily: fonts.primary[600],
    textAlign: 'center',
    paddingTop: 10,
    color: colors.text.dark,
  },
});
