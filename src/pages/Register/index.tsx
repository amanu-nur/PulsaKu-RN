import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth';
import {getDatabase, ref, set} from 'firebase/database';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Gap, Input} from '../../components';
import {Fire} from '../../config';
import {
  colors,
  fonts,
  showError,
  showSuccess,
  storeData,
  useForm,
} from '../../utils';
import {useDispatch} from 'react-redux';

type PrivateProps = {
  navigation: any;
};

const Register = ({navigation}: PrivateProps) => {
  const dispatch = useDispatch();
  const [form, setForm] = useForm({
    fullname: '',
    email: '',
    phone: '',
    address: '',
    username: '',
    password: '',
  });

  const Register = () => {
    dispatch({type: 'SET_LOADING', value: true});
    const db = getDatabase(Fire);
    const auth = getAuth(Fire);

    if (
      !form.fullname ||
      !form.email ||
      !form.phone ||
      !form.address ||
      !form.username ||
      !form.password
    ) {
      showError('Mohon jangan kosongan field yang ada');
      dispatch({type: 'SET_LOADING', value: false});
    } else {
      createUserWithEmailAndPassword(auth, form.email, form.password)
        .then(res => {
          showSuccess('Register berhasil');

          const data = {
            fullname: form.fullname,
            email: form.email,
            phone: form.phone,
            address: form.address,
            username: form.username,
            password: form.password,
            wallet: 0,
            uid: res.user.uid,
          };

          set(ref(db, `users/${res.user.uid}`), data);
          dispatch({type: 'SET_LOADING', value: false});
          storeData('user', data);
          navigation.replace('Bonus');
        })
        .catch(err => {
          dispatch({type: 'SET_LOADING', value: false});
          if (form.password.length < 8) {
            showError('Masukan password minimal 8 karakter');
          } else {
            if (err.message == 'Firebase: Error (auth/invalid-email).') {
              showError('Masukan format email yang benar');
            } else if (
              err.message == 'Firebase: Error (auth/email-already-in-use).'
            ) {
              showError('Email telah terdaftar pada sistem kami');
            }
          }
        });
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Buat akun barumu dan nikmati keseruannya.
        </Text>
        <View style={styles.body}>
          <View>
            <Input
              value={form.fullname}
              onChangeText={e => setForm('fullname', e)}
              title="Nama Lengkap"
              placeholder="Masukan nama lengkap"
            />
            <Gap height={20} width={0} />
            <Input
              value={form.email}
              onChangeText={e => setForm('email', e)}
              title="Alamat Email"
              placeholder="email@example.com"
            />
            <Gap height={20} width={0} />
            <Input
              value={form.phone}
              onChangeText={e => setForm('phone', e)}
              title="No Handphone"
              placeholder="08xxxxxxxxxx"
              keyboardType="numeric"
            />
            <Gap height={20} width={0} />
            <Input
              value={form.address}
              onChangeText={e => setForm('address', e)}
              title="Alamat"
              placeholder="Masukan alamat"
            />
            <Gap height={20} width={0} />
            <Input
              value={form.username}
              onChangeText={e => setForm('username', e)}
              title="Username"
              placeholder="Masukan username"
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
          <Gap height={40} width={0} />
          <Button title="DAFTAR" onPress={Register} />
        </View>
        <View style={styles.footer}>
          <Text style={styles.ask}>Sudah punya akun? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.btnfoot}>Masuk</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Register;

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
