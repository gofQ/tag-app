import { View, Text, Pressable } from 'react-native'
import React from 'react'
import SafeAreaView from '../components/global/SafeAreaView'
import { color, fonts } from '../utils/constants'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { useGetBalanceQuery } from '../redux/services/balance'
import Loading from '../components/global/Loading'
import ErrorComp from '../components/global/ErrorComp'

const Wallet = ({navigation}:any) => {
    const {data,isLoading,isError}=useGetBalanceQuery()


    if(isLoading) return <Loading/>
    // if(isError) return <ErrorComp/>

  return (
    <SafeAreaView>
        <View style={{flexDirection:'column',paddingHorizontal:16}}>
            <View style={{flexDirection:'column',boxShadow:'0 1 3 .5 #ccc',borderRadius:8,backgroundColor:'#fff',marginTop:8,}}>
                <View style={{flexDirection:'row',paddingTop:8,paddingHorizontal:14,alignItems:'flex-start',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'column'}}>
                        <Text style={[fonts.semibold,{fontSize:24}]}>Martı Cüzdan</Text>
                        <Text style={[fonts.bold,{fontSize:30,color:color.primary}]}>₺{data?.balance?? '0.00'}</Text>
                    </View>
                    <Pressable onPress={()=>navigation.navigate('AddBalance')}>
                        <View style={{backgroundColor:color.primary,paddingVertical:6,paddingHorizontal:16,marginTop:8,borderRadius:6,boxShadow:'0 .5 3 .5 #ccc'}}>
                            <Text style={[fonts.semibold,{fontSize:16,color:'#fff'}]}>Para Yükle</Text>
                        </View>
                    </Pressable>
                </View>
                <Pressable onPress={()=>navigation.navigate('AutoReload')}>
                    <View style={{flexDirection:'row',paddingHorizontal:16,paddingVertical:12,justifyContent:'space-between',alignItems:'center',borderTopWidth:1,borderTopColor:'#00000025',borderBottomWidth:1,borderBottomColor:'#00000025',marginTop:32}}>
                        <Text style={[fonts.medium,{color:'#00000080',fontSize:16}]}>Otomatik Yenileme</Text>
                        <View style={{flexDirection:'row',alignItems:'center',gap:12}}>
                            <Text style={[fonts.medium,{color:color.primary,fontSize:16}]}>Aç</Text>
                            <FontAwesome5Icon name='chevron-right' size={18} color={color.primary}/>
                        </View>
                    </View>
                </Pressable>
                <Pressable onPress={()=>navigation.navigate('AccountActivities')}>
                    <View style={{flexDirection:'row',paddingHorizontal:16,paddingVertical:12,justifyContent:'space-between',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#ccc'}}>
                        <Text style={[fonts.medium,{color:'#00000080',fontSize:16}]} >Hesap Hareketleri</Text>
                        <FontAwesome5Icon name='chevron-right' size={18} color={color.primary}/>
                    </View>
                </Pressable>
            </View>

            <View style={{flexDirection:'column',paddingHorizontal:16,marginTop:32,backgroundColor:'#fff',borderRadius:8,boxShadow:'0 1 3 .5 #ccc',paddingVertical:10}}>
                <Pressable onPress={()=>navigation.navigate('SendBalance')}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}} >
                        <View style={{flexDirection:'row',alignItems:'center',gap:8}} >
                            <FontAwesomeIcon name='money' size={24} color={color.primary}/>
                            <Text style={[fonts.semibold,{fontSize:16,color:color.primary}]}>Arkadaşına Bakiye Gönder</Text>
                        </View>
                        <FontAwesome5Icon name='chevron-right' size={20} color={color.primary}/>
                    </View>
                </Pressable>
                <Text style={[fonts.medium,{color:'#00000070',fontSize:14,marginTop:8}]}>Martı binmesi için arkadaşına bakiye gönder!</Text>
            </View>

            <View style={{flexDirection:'column',paddingHorizontal:16,marginTop:32,backgroundColor:'#fff',borderRadius:8,boxShadow:'0 1 3 .5 #ccc',paddingVertical:10}}>
                <Pressable onPress={()=>navigation.navigate('CCPage')}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <Text style={[fonts.semibold,{fontSize:24}]}>Kartlar</Text>
                        <FontAwesome5Icon name='chevron-right' size={20} color={'#00000070'}/>
                    </View>
                </Pressable>
                <Text style={[fonts.medium,{fontSize:16,color:'#00000080',marginTop:8}]}>Henüz bir kartınız yok</Text>
            </View>

        </View>
    </SafeAreaView>
  )
}

export default Wallet