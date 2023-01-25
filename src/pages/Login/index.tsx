import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  colors,
  fonts,
  showError,
  showSuccess,
  storeData,
  useForm,
} from '../../utils';
import {Button, Gap, Input} from '../../components';
import {Fire} from '../../config';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {getDatabase, ref, onValue} from 'firebase/database';
import {useDispatch} from 'react-redux';

type PrivateProps = {
  navigation: any;
};

const Login = ({navigation}: PrivateProps) => {
  const auth = getAuth(Fire);
  const db = getDatabase(Fire);
  const dispatch = useDispatch();
  const [form, setForm] = useForm({
    email: '',
    password: '',
  });

  const Login = () => {
    dispatch({type: 'SET_LOADING', value: true});

    signInWithEmailAndPassword(auth, form.email, form.password)
      .then(userCredential => {
        const user = userCredential.user;

        const url = ref(db, `users/${user.uid}`);
        onValue(url, snapshot => {
          dispatch({type: 'SET_LOADING', value: false});
          showSuccess('Halo selamat datang kembali');
          const data = snapshot.val();
          storeData('user', data);
          navigation.replace('MainApp');
        });
      })
      .catch(error => {
        dispatch({type: 'SET_LOADING', value: false});
        const errorMessage = error.message;
        if (errorMessage == 'Firebase: Error (auth/wrong-password).') {
          showError('Password salah');
        } else if (errorMessage == 'Firebase: Error (auth/internal-error).') {
          showError('Masukan password kamu');
        } else if (errorMessage == 'Firebase: Error (auth/user-not-found).') {
          showError('Email belum terdaftar');
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Masukan akunmu dan nikmati promonya</Text>
      <View style={styles.body}>
        <View>
          <Input
            value={form.email}
            onChangeText={e => setForm('email', e)}
            title="Email"
            placeholder="Masukan email"
          />
          <Gap height={20} width={0} />
          <Input
            value={form.password}
            onChangeText={e => setForm('password', e)}
            title="Password"
            placeholder="Masukan password"
            secureTextEntry={true}
          />
        </View>
        <Gap height={20} width={0} />
        <Button title="MASUK" onPress={Login} />
      </View>
      <View style={styles.footer}>
        <Text style={styles.ask}>Belum punya akun? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.btnfoot}>Buat disini</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.cream,
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 30,
  },
  title: {
    color: colors.text.dark,
    fontFamily: fonts.primary[600],
    fontSize: 24,
  },
  body: {
    backgroundColor: colors.background.white,
    marginTop: 30,
    padding: 30,
    borderRadius: 18,
    flex: 1,
    justifyContent: 'space-between',
  },
  footer: {
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ask: {
    color: colors.text.secondary,
    fontFamily: fonts.primary[200],
  },
  btnfoot: {
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
  },
});
