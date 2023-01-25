import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  Balance,
  Button,
  Gap,
  Header,
  Input,
  Menu,
  Promo,
  Topup,
} from '../../components';
import {
  colors,
  fonts,
  getData,
  showError,
  showSuccess,
  useForm,
} from '../../utils';
import {getDatabase, ref, onValue, update, push} from 'firebase/database';
import {getAuth, signOut} from 'firebase/auth';
import {Fire} from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {useDispatch} from 'react-redux';

type PrivateProps = {
  navigation: any;
};

const Home = ({navigation}: PrivateProps) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const [member, setMember] = useState();
  const [wallet, setWallet] = useState([]);
  const [nominal, setNominal] = useState();
  const [pulsa, setPulsa] = useState();
  const [form, setForm] = useForm({
    username: '',
    nominal: '',
  });
  // Time
  const arrbulan = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Mei',
    'Jun',
    'Jul',
    'Agu',
    'Sep',
    'Okt',
    'Nov',
    'Des',
  ];
  const date = new Date();
  const dates = `${date.getDate()} ${
    arrbulan[date.getMonth()]
  } ${date.getFullYear()} * ${date.getHours()}:${date.getMinutes()}`;
  // const []
  const db = getDatabase(Fire);
  useEffect(() => {
    getData('user').then(res => {
      getWallet(res.uid);
      setUser(res);
    });
    getAllUser();
  }, [navigation]);

  const getWallet = (uid: string) => {
    const starCountRef = ref(db, `users/${uid}`);
    onValue(starCountRef, snapshot => {
      const data = snapshot.val();
      setWallet(data.wallet);
    });
  };

  const Logout = () => {
    const auth = getAuth(Fire);
    signOut(auth).then(() => {
      AsyncStorage.multiRemove(['user']).then(() => {
        navigation.replace('Login');
      });
    });
  };

  const getAllUser = () => {
    const starCountRef = ref(db, 'users/');
    onValue(starCountRef, snapshot => {
      if (snapshot.val()) {
        const oldData = snapshot.val();
        const data = [];

        Object.keys(oldData).map(key => {
          data.push({
            ...oldData[key],
          });
        });

        setMember(data);
      }
    });
  };

  const TopupFunc = () => {
    if (!nominal) {
      showError('Masukan nominal');
    } else if (parseInt(nominal) < 20000) {
      showError('Masukan nominal minimal Rp20.000');
    } else {
      dispatch({type: 'SET_LOADING', value: true});
      const jml = parseInt(wallet) + parseInt(nominal);
      update(ref(db, `users/${user.uid}`), {wallet: jml})
        .then(() => {
          // Update History
          const data = {
            fullname: user.fullname,
            phone: user.phone,
            amount: parseInt(nominal),
            type: 'Topup',
            status: 'Success',
            date: dates,
            transaction_id: `#PLS${(Math.random() + 1)
              .toString(36)
              .substring(7, 2)}-${(Math.random() + 1)
              .toString(36)
              .substring(7, 2)}`,
          };

          const db = getDatabase(Fire);
          push(ref(db, 'history/'), data);
          showSuccess('Topup berhasil');
          dispatch({type: 'SET_LOADING', value: false});
        })
        .catch(() => {
          showError('Topup gagal');
          dispatch({type: 'SET_LOADING', value: false});
        });
    }
  };

  const TransferFunc = () => {
    if (!form.username) {
      showError('Masukan akun tujuan');
    } else if (!form.nominal) {
      showError('Masukan nominal');
    } else if (form.nominal < 20000) {
      showError('Masukan nominal minimal Rp20.000');
    } else if (parseInt(wallet) < parseInt(form.nominal)) {
      showError('Maaf saldo tidak mencukupi');
    } else {
      const filter = member.filter(item => item.username === form.username);
      if (filter.length <= 0) {
        showError('Akun tidak ditemukan');
      } else if (filter[0].username === user.username) {
        showError('Jangan masukan akun kamu sendiri');
      } else {
        dispatch({type: 'SET_LOADING', value: true});
        // Update Data Friend
        const jml = parseInt(filter[0].wallet) + parseInt(form.nominal);
        update(ref(db, `users/${filter[0].uid}`), {wallet: jml}).then(() => {
          // Update Data
          const min = parseInt(wallet) - parseInt(form.nominal);
          update(ref(db, `users/${user.uid}`), {wallet: min}).then(() => {
            // Update History
            const data = {
              fullname: user.fullname,
              phone: user.phone,
              amount: parseInt(form.nominal),
              type: 'Transfer',
              status: 'Success',
              date: dates,
              transaction_id: `#PLS${(Math.random() + 1)
                .toString(36)
                .substring(7, 2)}-${(Math.random() + 1)
                .toString(36)
                .substring(7, 2)}`,
            };

            const db = getDatabase(Fire);
            push(ref(db, 'history/'), data);

            showSuccess('Transfer berhasil');

            dispatch({type: 'SET_LOADING', value: false});
          });
        });
      }
    }
  };

  const buyPulsa = () => {
    if (!pulsa) {
      showError('Pilih salah satu nominal');
    } else if (parseInt(wallet) < parseInt(pulsa)) {
      showError('Maaf saldo tidak mencukupi');
    } else {
      dispatch({type: 'SET_LOADING', value: true});
      const jml = parseInt(wallet) - parseInt(pulsa);
      update(ref(db, `users/${user.uid}`), {wallet: jml})
        .then(() => {
          // Update History
          const data = {
            fullname: user.fullname,
            phone: user.phone,
            amount: parseInt(pulsa),
            type: 'Buy',
            status: 'Success',
            date: dates,
            transaction_id: `#PLS${(Math.random() + 1)
              .toString(36)
              .substring(7, 2)}-${(Math.random() + 1)
              .toString(36)
              .substring(7, 2)}`,
          };

          const db = getDatabase(Fire);
          push(ref(db, 'history/'), data);

          showSuccess('Pulsa berhasil dibeli');
          dispatch({type: 'SET_LOADING', value: false});
        })
        .catch(() => {
          showError('Oppss gagal');
          dispatch({type: 'SET_LOADING', value: false});
        });
    }
  };

  // Top Up
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [1, '50%', '75%'], []);
  const handleSnapPress = useCallback(index => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  // Transfer
  const transferRef = useRef<BottomSheet>(null);
  const handleTransfer = useCallback(index => {
    transferRef.current?.snapToIndex(index);
  }, []);
  const handleCloseTf = useCallback(() => {
    transferRef.current?.close();
  }, []);

  // Pulsa
  const pulsaRef = useRef<BottomSheet>(null);
  const handlePulsa = useCallback(index => {
    pulsaRef.current?.snapToIndex(index);
  }, []);
  const handleClosePulsa = useCallback(() => {
    pulsaRef.current?.close();
  }, []);

  return (
    <>
      <Header onPress={Logout} />
      <View style={styles.container}>
        <Gap height={20} width={0} />
        <Balance
          name={user?.fullname.split(' ')[0]}
          wallet={wallet ? Intl.NumberFormat('id-ID').format(wallet) : 0}
        />
        <Gap height={15} width={0} />
        <Topup
          navigation={navigation}
          Topup={() => handleSnapPress(1)}
          Transfer={() => handleTransfer(2)}
        />
        <Gap height={15} width={0} />
        <Menu onPress={() => handlePulsa(2)} />
        <Gap height={15} width={0} />
        <Promo />
      </View>

      {/* Modal Topup */}
      <BottomSheet
        enableOverDrag={true}
        snapPoints={snapPoints}
        ref={sheetRef}
        enablePanDownToClose={true}>
        <BottomSheetView style={styles.containerModal}>
          <Header
            type="modal"
            title="Top Up"
            onPress={() => handleClosePress()}
          />

          <View>
            <Input
              title="Masukan Nominal"
              keyboardType="numeric"
              placeholder="Masukan nominal (min: 20000)"
              value={nominal}
              onChangeText={e => setNominal(e)}
            />
            <Gap height={60} width={0} />
            <Button title="Top Up" onPress={TopupFunc} />
          </View>
        </BottomSheetView>
      </BottomSheet>

      {/* Transfer */}
      <BottomSheet
        enableOverDrag={true}
        snapPoints={snapPoints}
        ref={transferRef}
        enablePanDownToClose={true}>
        <BottomSheetView style={styles.containerModal}>
          <Header
            type="modal"
            title="Transfer"
            onPress={() => handleCloseTf()}
          />

          <View style={{justifyContent: 'space-between', flex: 1}}>
            <View>
              <Input
                title="Masukan Username"
                placeholder="Masukan username tujuan"
                value={form.username}
                onChangeText={e => setForm('username', e)}
              />
              <Gap height={20} width={0} />
              <Input
                title="Masukan Nominal"
                keyboardType="numeric"
                placeholder="Masukan nominal (min:20000)"
                value={form.nominal}
                onChangeText={e => setForm('nominal', e)}
              />
            </View>
            <Gap height={20} width={0} />
            <View>
              <Button title="Transfer" onPress={TransferFunc} />
              <Gap height={30} width={0} />
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>

      {/* Pulsa */}
      <BottomSheet
        enableOverDrag={true}
        snapPoints={snapPoints}
        ref={pulsaRef}
        enablePanDownToClose={true}>
        <BottomSheetView style={styles.containerModal}>
          <Header
            type="modal"
            title="Pulsa"
            onPress={() => handleClosePulsa()}
          />

          <View style={{justifyContent: 'space-between', flex: 1}}>
            <View>
              <Text style={styles.title}>Pilih Nominal</Text>
              <Gap height={15} width={0} />
              <View style={styles.pulsaBody}>
                <Button
                  type="pulsa"
                  title="5.000"
                  onPress={() => setPulsa('5000')}
                  active={pulsa == '5000'}
                />
                <Button
                  type="pulsa"
                  title="10.000"
                  onPress={() => setPulsa('10000')}
                  active={pulsa == '10000'}
                />
                <Button
                  type="pulsa"
                  title="50.000"
                  onPress={() => setPulsa('50000')}
                  active={pulsa == '50000'}
                />
                <Button
                  type="pulsa"
                  title="100.000"
                  onPress={() => setPulsa('100000')}
                  active={pulsa == '100000'}
                />
                <Button
                  type="pulsa"
                  title="200.000"
                  onPress={() => setPulsa('200000')}
                  active={pulsa == '200000'}
                />
              </View>
            </View>
            <View>
              <Button title="Beli" onPress={buyPulsa} />
              <Gap height={30} width={0} />
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    flex: 1,
    backgroundColor: colors.background.cream,
  },
  containerModal: {
    paddingHorizontal: 24,
    flex: 1,
    backgroundColor: colors.background.white,
  },
  pulsaBody: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.primary[600],
    color: colors.text.dark,
  },
});
