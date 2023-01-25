import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Bonus, History, Home, Invoice, Login, Register, Splash} from '../pages';
import {BottomTab} from '../components';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function index() {
  const MainApp = () => {
    return (
      <Tab.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Home"
        tabBar={props => <BottomTab {...props} />}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="History" component={History} />
      </Tab.Navigator>
    );
  };

  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Bonus" component={Bonus} />
      <Stack.Screen name="MainApp" component={MainApp} />
      <Stack.Screen name="Invoice" component={Invoice} />
    </Stack.Navigator>
  );
}
