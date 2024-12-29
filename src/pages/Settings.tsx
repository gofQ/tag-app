import { View, Text, Dimensions, Pressable } from 'react-native'
import React from 'react'
import SafeAreaView from '../components/global/SafeAreaView'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { fonts } from '../utils/constants'
import { clearToken } from '../utils/as'

const {width,height}=Dimensions.get('window')

const Settings = ({navigation}:any) => {

    const sections=[
        {
            title:'Hesap',
            navigation:'SProfile'
        },
        {
            title:'Fatura Adresleri',
            navigation:'Billing'
        },
        {
            title:'Bildirimler',
            navigation:'NotificationPage'
        },

      
        {
            title:'Çıkış Yap',
            logout:true
        }
    
    ]

    const logout=async()=> {
        await clearToken().then(()=>navigation.navigate('Login'))
    }


  return (
    <SafeAreaView>
        <View style={{width:width*.9, backgroundColor:'#fff',borderRadius:8,marginHorizontal:'auto',boxShadow:'0 1 7.5  #ccc',marginTop:height*.05}} >
            {
                sections.map((section,index)=>(
                    <Pressable onPress={section?.navigation? ()=>navigation.navigate(section.navigation) : section?.logout ? logout : ()=>{{}}    } key={index}>
                        <View key={index} style={{flexDirection:'row', alignItems:'center', gap:12,paddingHorizontal:16,paddingVertical:14}}>
                        {
                            section.title==="Hesap" ? 
                            <Ionicons name='person' size={20} color='#00000099'/>
                            : section.title==="Bildirimler" ?
                            <Ionicons name='notifications' size={20} color='#00000099'/>
                            : section.title==="Fatura Adresleri" ?
                            <MaterialIcons name='location-on' size={20} color='#00000099'/> 
                            : section.title==="Çıkış Yap" ?
                            <Ionicons name='exit' size={20} color='#00000099'/>
                            : null
                        }
                            <Text style={[fonts.medium,{fontSize:16,color:'#00000099',transform:[{translateY:1}]}]}>{section.title}</Text>
                        </View>
                    </Pressable>
                ))
            }
        </View>
    </SafeAreaView>
  )
}

export default Settings