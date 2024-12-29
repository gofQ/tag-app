import {View, Text, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import {color, fonts} from '../../utils/constants';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

type Props = {
  title: string;
  navigation?: any;
};

const OptItem: React.FC<Props> = ({title,navigation}) => {
  const iconProps = {
    color: color.primary,
    size: 24,
  };

    const func = () => {
        if (title === 'Martı Cüzdan') {
        navigation.navigate('Wallet');
        } else if (title === 'Kampanyalar') {
        navigation.navigate('Campaign');
        } else if (title === 'Ayarlar') {
        navigation.navigate('Settings');
        } else if (title === 'Yardım Merkezi') {
        navigation.navigate('SupportCenter');
        }
    };

  const icon = () => {
    switch (title) {
      case 'Kampanyalar':
        return <Icon name="campaign" {...iconProps} />;
      case 'Martı Cüzdan':
        return <FontAwesome5Icon name="wallet" {...iconProps} />;
      case 'Sürüş Geçmişi':
        return <Material name="human-scooter" {...iconProps} />;
      case 'Sürüş Kılavuzu':
        return <FontAwesome5Icon name="book" {...iconProps} />;
      case 'Yardım Merkezi':
        return <FontAwesome5Icon name="question-circle" {...iconProps} />;
      case 'Ayarlar':
        return <Material name="cog" {...iconProps} />;
      default:
        return '';
    }
  };
  return (
    <Pressable onPress={func ?? (() => {})}>
      {title === 'Sürüş Kılavuzu' ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 18,
            paddingVertical: 14,
          }}>
          <View style={{flexDirection:'row',alignItems:'center',gap:16}}>
            {icon()}
            <Text style={[fonts.medium, {fontSize: 16, color: '#000'}]}>
                {title}
                </Text>
          </View>
            <FontAwesome5Icon
              name="chevron-right"
              size={20}
              color={color.primary}
              style={{transform:[{translateY:2}]}}
            />
        </View>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 16,
            paddingHorizontal: 18,
            paddingVertical: 14,
          }}>
          {icon()}
          <Text style={[fonts.medium, {fontSize: 16, color: '#000'}]}>
            {title}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

export default OptItem;
