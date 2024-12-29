import { View, Text, Dimensions, TextInput } from 'react-native'
import React from 'react'
import SafeAreaView from '../components/global/SafeAreaView'
import { fonts } from '../utils/constants'
import helpCenter from '../utils/json/helpCenter.json'

const SupportCenter = () => {
  const [searchTerm, setSearchTerm] = React.useState('')
  const {width,height}=Dimensions.get('window')


  const searchResults=helpCenter?.filter((item:any)=>item?.title.toLowerCase().includes(searchTerm?.toLowerCase()))

  return (
    <SafeAreaView>
        <View style={{width:width*.85,marginHorizontal:'auto'}}>
            <View style={{borderWidth:1,borderColor:'#ccc',borderRadius:10,paddingHorizontal:8,marginTop:height*.03}}>
              <TextInput placeholder="Nasıl yardımcı olabilirim?" style={[fonts.medium,{fontSize:16,color:"#000"}]} placeholderTextColor={"#00000070"} value={searchTerm} onChangeText={(text)=>setSearchTerm(text)} />
            </View>
            <View>
              {
               searchTerm ? 
               searchResults?.map((item:any,index:number)=>(
                <View key={index} style={{borderWidth:1,borderColor:'#ccc',borderRadius:10,padding:8,marginTop:8}}>
                  <Text style={[fonts.semibold,{fontSize:16,color:"#000"}]}>{item?.title}</Text>
                  <Text style={[fonts.medium,{fontSize:14,color:"#000"}]}>{item?.content}</Text>
                </View>
              )):
              <Text style={[fonts.medium,{fontSize:16,color:'#00000070',textAlign:'center',marginTop:height*.2}]}>Sonuç bulunamadı...</Text>
              }
            </View>
        </View>
    </SafeAreaView>
  )
}

export default SupportCenter