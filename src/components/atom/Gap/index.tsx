import React from 'react';
import {View} from 'react-native';

type PrivateProps = {
  height: number;
  width: number;
};

const Gap = ({height, width}: PrivateProps) => {
  return <View style={{height: height, width: width}}></View>;
};

export default Gap;
