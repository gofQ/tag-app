import { View, Text, Dimensions, Switch, Pressable } from 'react-native'
import React from 'react'
import SafeAreaView from '../components/global/SafeAreaView'
import { color, fonts } from '../utils/constants';
import Icon from 'react-native-vector-icons/MaterialIcons'

const {width,height}=Dimensions.get('window')

const AutoReload = () => {
    const [isEnabled, setIsEnabled] = React.useState(true);
    const [reloadAmount, setReloadAmount] = React.useState(100);
    const [checked, setChecked] = React.useState(false);
    
  return (
    <SafeAreaView style={{justifyContent:'space-between'}}>
        <View style={{width:width*.85,marginHorizontal:'auto'}}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:height*.01,backgroundColor:'#fff',paddingHorizontal:16,paddingVertical:16,borderRadius:6}}>
                <Text style={[fonts.medium,{fontSize:16}]}>Otomatik Yenileme</Text>
                <Switch
                    trackColor={{ false: "#ccc", true: "#33d10050" }}
                    thumbColor={isEnabled ? "#33d100" : "#767577"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={()=>setIsEnabled(!isEnabled)}
                    value={isEnabled}
                    
                />
            </View>
            <Text style={[fonts.normal,{color:'#00000070',fontSize:14,marginTop:height*.035,}]}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae at cupiditate, ipsum accusamus nemo sit enim non voluptas voluptatibus quaerat! Cumque nesciunt quasi ducimus eveniet repudiandae nobis alias eius atque?</Text>

           {
            isEnabled && 
            <View  style={{flexDirection:'row',marginTop:height*.05,gap:24,alignItems:'center',justifyContent:'center'}}>
            {
                [50,100,200].map((item,index)=>(
                    
                <Pressable onPress={()=>setReloadAmount(item)} key={index}>
                    <View key={index} style={{alignItems:'center',justifyContent:'center',backgroundColor:reloadAmount===item ? color.primary : '#fff',borderRadius:8,boxShadow:'0 1 3 .5 #ccc',paddingVertical:12,paddingHorizontal:16,transform:[{scale:reloadAmount==item ? 1.25 : 1}]}}>
                        <Text style={[fonts.semibold,{fontSize:24,color:reloadAmount===item ? '#fff' : '#000000'}]}>₺{item}</Text>
                    </View>
                </Pressable>
            
                ))
            }
            </View>
           }

           <View style={{flexDirection:'row',alignItems:'center',marginTop:height*.05,gap:12}}>
            {
                checked ? 
                <Icon  name='check-box' size={24} color={color.primary} onPress={()=>setChecked(!checked)}/>
                :
                <Icon  name='check-box-outline-blank' size={24} color={color.primary} onPress={()=>setChecked(!checked)}/>
            }
            <Text style={[fonts.medium,{fontSize:16,}]}>Otomatik yenilemeyi onaylıyorum</Text>
           </View>
           
        </View>
        <View style={{backgroundColor:color.primary,paddingVertical:10,width:width*.85,alignItems:'center',justifyContent:'center',borderRadius:10,marginHorizontal:'auto',marginBottom:height*.04,elevation:2}}>
            <Text style={[fonts.semibold,{color:"#fff",fontSize:16}]}>Kaydet</Text>
        </View>
    </SafeAreaView>
  )
}

export default AutoReload