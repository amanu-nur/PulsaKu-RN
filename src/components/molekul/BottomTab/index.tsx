import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../../../utils';
import {
  IcHistory,
  IcHistoryActive,
  IcHome,
  IcHomeActive,
} from '../../../assets';

type PrivateProps = {
  state: any;
  descriptors: any;
  navigation: any;
};

const BottomTab = ({state, descriptors, navigation}: PrivateProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({name: route.name, merge: true});
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const Icon = () => {
            if (label === 'Home') {
              return isFocused ? <IcHomeActive /> : <IcHome />;
            }
            if (label === 'History') {
              return isFocused ? <IcHistoryActive /> : <IcHistory />;
            }
            return <IcHome />;
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabItem}>
              <Icon />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.cream,
  },
  body: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginBottom: 30,
    backgroundColor: colors.background.white,
    borderRadius: 18,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 18,
  },
});
