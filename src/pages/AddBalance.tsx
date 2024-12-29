import { View, Text, Dimensions,Pressable,Switch } from 'react-native'
import React from 'react'
import SafeAreaView from '../components/global/SafeAreaView'
import { color, fonts } from '../utils/constants'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useAddBalanceMutation, useGetBalanceQuery } from '../redux/services/balance'
import Loading from '../components/global/Loading'
import ErrorComp from '../components/global/ErrorComp'
import Alert from '../components/global/Alert'

const {width,height}=Dimensions.get('window')

const AddBalance = () => {
    const {data,isLoading,isError}=useGetBalanceQuery()
    const [addBalance,{isLoading:isAdding,isError:isAddError}]=useAddBalanceMutation()
    const [isEnabled, setIsEnabled] = React.useState(false);
    const [reloadAmount,setReloadAmount]=React.useState<number>(100)
    const [checked, setChecked] = React.useState(false);
    const [showAlert, setShowAlert] = React.useState(false)
    const [alertMessage, setAlertMessage] = React.useState('')
    const [alertTitle, setAlertTitle] = React.useState('')


    if(isLoading) return <Loading/>
    // if(isError) return <ErrorComp/>

    const addBalanceHandler=async()=>{
        if(!checked){
            setAlertMessage('Sözleşmeyi okuyup onaylayınız')
            setAlertTitle('Hata')
            setShowAlert(true)
            return
        }

        try{
            const response=await addBalance({amount:reloadAmount}).unwrap()
            console.log(response)
            if(response.balance){
                setAlertMessage('Yükleme başarılı')
                setAlertTitle('Başarılı')
                setShowAlert(true)
            } else {
                setAlertMessage('Yükleme başarısız')
                setAlertTitle('Hata')
                setShowAlert(true)
            }
        } catch(e){
            setAlertMessage('Yükleme başarısız')
            setAlertTitle('Hata')
            setShowAlert(true)
        }
    }

  return (
    <SafeAreaView style={{justifyContent:'space-between'}}>
        <Alert title={alertTitle} message={alertMessage} visible={showAlert} onClose={()=>setShowAlert(false)} />
        <View style={{width:width*.85,marginHorizontal:'auto'}}>
            <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center',marginTop:height*.05}}>
                <Text style={[fonts.medium,{color:"#00000070"}]}>Bakiye</Text>
                <Text style={[fonts.semibold,{color:color.primary,fontSize:32}]}>₺{data?.balance?? '0.00'}</Text>
                <Text style={[fonts.medium,{color:"#00000070",fontSize:16}]} >Yüklemek istediğiniz miktarı seçin</Text>
            </View>
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
            
            <Pressable >
                <Text style={[fonts.medium,{color:"#00000070",textDecorationLine:'underline',textDecorationColor:'#00000070',marginTop:height*.04,textAlign:'center'}]}>Ödeme yöntemlerim</Text>
            </Pressable>
                
            <View style={{flexDirection:'row',alignItems:'center',marginTop:height*.035,gap:12}}>
                {
                    checked ? 
                        <Icon  name='check-box' size={24} color={color.primary} onPress={()=>setChecked(!checked)}/>
                    :
                        <Icon  name='check-box-outline-blank' size={24} color={color.primary} onPress={()=>setChecked(!checked)}/>
                }
                <Text style={[fonts.medium,{fontSize:16,}]}>Bakiye yüklemeyi onaylıyorum</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:height*.035}}>
                <Text style={[fonts.medium,{fontSize:16}]}>Otomatik Yenileme</Text>
                <Switch
                 trackColor={{ false: "#ccc", true: "#33d10050" }}
                 thumbColor={isEnabled ? "#33d100" : "#767577"}
                 ios_backgroundColor="#3e3e3e"
                 onValueChange={()=>setIsEnabled(!isEnabled)}
                 value={isEnabled}
                 />
            </View>
            <Text style={[fonts.normal,{color:"#00000070",textAlign:'center',marginTop:height*.015}]}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem repellendus aliquid laborum ratione amet enim ipsum quis deserunt sequi incidunt earum, optio maxime commodi, corrupti atque, nesciunt neque sint accusantium?</Text>

        </View>
         <Pressable onPress={addBalanceHandler}>
            <View style={{backgroundColor:color.primary,paddingVertical:10,width:width*.85,alignItems:'center',justifyContent:'center',borderRadius:10,marginHorizontal:'auto',marginBottom:height*.04,elevation:2}}>
                <Text style={[fonts.semibold,{color:"#fff",fontSize:16}]}>Bakiye Yükle</Text>
            </View>
         </Pressable>
    </SafeAreaView>
  )
}

export default AddBalance