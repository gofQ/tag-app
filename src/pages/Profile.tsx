import { View, Text } from 'react-native'
import React from 'react'
import { color, fonts } from '../utils/constants'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import OptItem from '../components/Profile/OptItem'
import SafeAreaView from '../components/global/SafeAreaView'


const Profile = ({navigation}:any) => {
  return (
    <SafeAreaView >
      <View style={{paddingHorizontal:16,marginTop:8}}>
        <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
          <Text style={[fonts.semibold,{fontSize:24}]}>Merhaba Kullanici</Text>
          <Material name='shield-check' size={24} color={color.primary}/>
        </View>
        <View style={{flexDirection:'column', borderRadius:8, marginTop:16,backgroundColor:'#fff',boxShadow:'0 1 3 .5 #ccc'}}>
          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:16,paddingTop:16}}>
            <Text style={[fonts.medium,{fontSize:16,color:"#000"}]}>Martı Cüzdan</Text>
            <View style={{flexDirection:'row',alignItems:'center',gap:8}}>
              <Text style={[fonts.medium,{fontSize:16,color:color.primary}]}>Detaylar</Text>
              <FontAwesome5Icon name='chevron-right' size={16} color={color.primary}/>
            </View>
          </View>
          <Text style={[fonts.bold,{fontSize:32,paddingHorizontal:16}]}>₺ 0.00</Text>
          <View style={{flexDirection:'row',alignItems:'center',marginTop:16,backgroundColor:color.primary,justifyContent:'center',paddingVertical:8,borderBottomLeftRadius:8,borderBottomRightRadius:8,gap:8}}>
          <FontAwesome5Icon name='plus' size={16} color='#fff'/>
            <Text style={[fonts.semibold,{fontSize:18,color:'#fff'}]}>Para Yükle</Text>
          </View>
        </View>

        <View style={{borderRadius:8, marginTop:32,boxShadow:'0 1 3 .5 #ccc',backgroundColor:'#fff'}}>
          <OptItem title='Martı Cüzdan' navigation={navigation}/>
          <OptItem title='Kampanyalar' navigation={navigation}/>
          <OptItem title='Sürüş Geçmişi'/>
          <OptItem title='Sürüş Kılavuzu'/>
          <OptItem title='Yardım Merkezi'/>
          <OptItem title='Ayarlar'/>
        </View>

      </View>
    </SafeAreaView>
  )
}

export default Profile