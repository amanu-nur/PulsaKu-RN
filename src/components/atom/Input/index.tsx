import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {colors, fonts} from '../../../utils';

type PrivateProps = {
  title: string;
  placeholder: string;
};

const Input = ({title, placeholder, ...props}: PrivateProps) => {
  const [border, setBorder] = useState(colors.border.secondary);
  const onFocusForm = () => {
    setBorder(colors.border.primary);
  };
  const onBlurForm = () => {
    setBorder(colors.border.secondary);
  };

  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        onFocus={onFocusForm}
        onBlur={onBlurForm}
        style={styles.input(border)}
        placeholder={placeholder}
        {...props}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontFamily: fonts.primary[400],
    color: colors.text.dark,
    marginBottom: 6,
  },
  input: (border: any) => ({
    borderColor: border,
    borderWidth: 1,
    borderRadius: 17,
    paddingVertical: 10,
    paddingHorizontal: 20,
  }),
});
