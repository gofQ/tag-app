import {View, ActivityIndicator} from 'react-native';
import React from 'react';
import {color} from '../../utils/constants';

const Loading = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:'#fff'}}>
      <ActivityIndicator size={48} color={color.primary} />
    </View>
  );
};

export default React.memo(Loading);
