import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IcLogo} from '../../assets';
import {Gap} from '../../components';
import {colors, fonts, getData} from '../../utils';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {Fire} from '../../config';

type PrivateProps = {
  navigation: any;
};

const Splash = ({navigation}: PrivateProps) => {
  const auth = getAuth(Fire);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      getData('user').then(res => {
        const data = res;
        setTimeout(() => {
          if (user || data) {
            navigation.replace('MainApp');
          } else {
            navigation.replace('Login');
          }
        }, 3000);
      });
    });

    return () => unsubscribe();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.bodyLogo}>
        <IcLogo />
        <Gap height={15} width={0} />
        <Text style={styles.titleSplash}>PULSAKU</Text>
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.primary,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyLogo: {
    alignItems: 'center',
  },
  titleSplash: {
    fontSize: 32,
    color: colors.text.white,
    fontFamily: fonts.primary['normal'],
    letterSpacing: 15,
  },
});
