import { View, Text } from 'react-native'
import React from 'react'
import { fonts } from '../../utils/constants'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'

const ErrorComp = () => {
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center',width:'100%',backgroundColor:'#fafafa'}} >
      <FontAwesome5Icon name='exclamation-triangle' size={48} color='#f00'/>
      <Text style={[fonts.medium,{fontSize:18,marginTop:16}]}>Bir hata oluştu...</Text>
    </View>
  )
}

export default ErrorComp