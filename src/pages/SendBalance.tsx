import { View, Text, Dimensions, TextInput, Pressable } from 'react-native'
import React from 'react'
import SafeAreaView from '../components/global/SafeAreaView'
import { color, fonts } from '../utils/constants'
import { useTransferBalanceMutation } from '../redux/services/balance'
import Alert from '../components/global/Alert'

const SendBalance = ({navigation}:any) => {
    const [transferBalance]=useTransferBalanceMutation()
    const [sendAmount, setSendAmount] = React.useState<any>(undefined)
    const [phone,setPhone]=React.useState('')
    const {width,height}=Dimensions.get('window')
    const [showAlert, setShowAlert] = React.useState(false)
    const [alertMessage, setAlertMessage] = React.useState('')
    const [alertTitle, setAlertTitle] = React.useState('')


    const sendBalanceHandler=async()=>{
        if(phone.trim()==='' || phone.trim().length!==10){
            setAlertTitle('Hata')
            setAlertMessage('Telefon numarası hatalı veya eksik girildi \nÖrnek: 5XX XXX XX XX')
            setShowAlert(true)
            return
        }
        if(!sendAmount){
            setAlertTitle('Hata')
            setAlertMessage('Tutar seçiniz')
            setShowAlert(true)
            return
        }

        try{
            const response=await transferBalance({amount:sendAmount,phone_number:`+90${phone}`}).unwrap()
            console.log(response)
            if(response){
                setPhone('')
                setSendAmount(undefined)
                setAlertTitle('Başarılı')
                setAlertMessage(`${phone} numarasına ${sendAmount} TL gönderildi`)
                setShowAlert(true)
                navigation.goBack()
            } else {
                setAlertTitle('Hata')
                setAlertMessage('Bir hata oluştu')
                setShowAlert(true)
            }
        } catch(e){
            setAlertTitle('Hata')
            setAlertMessage('Bir hata oluştu')
            setShowAlert(true)
        }
    }

  return (
    <SafeAreaView style={{justifyContent:'space-between'}}>
        <Alert title={alertTitle} message={alertMessage} visible={showAlert} onClose={()=>setShowAlert(false)} />
        <View style={{width:width*.9,borderRadius:8,marginHorizontal:'auto',marginTop:height*.025}}>
            <Text style={[fonts.medium,{fontSize:16,color:'#000'}]}>Alıcı Telefon Numarası</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',}}>
                <View style={{marginTop:8,borderWidth:1,borderColor:'#00000033',borderRadius:8,paddingHorizontal:8,width:width*.17}}>
                    <TextInput value='+90' maxLength={10} keyboardType='number-pad' style={[fonts.medium,{fontSize:16,color:'#000'}]} readOnly />
                </View>
                <View style={{marginTop:8,borderWidth:1,borderColor:'#00000033',borderRadius:8,paddingHorizontal:8,width:width*.7}}>
                    <TextInput placeholder='Telefon Numarası' maxLength={10} placeholderTextColor='#00000070' keyboardType='number-pad' style={[fonts.medium,{fontSize:16,color:'#000'}]} value={phone} onChangeText={(text)=>setPhone(text)} />
                </View>
            </View>
            <Text style={[fonts.medium,{fontSize:16,color:'#000',marginTop:height*.05}]}>Gönderilecek Tutar</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                {
                    [25,50,100,200].map((item,index)=>(
                       <Pressable onPress={()=>setSendAmount(item)} key={index}>
                            <View style={{flexDirection:'row',gap:24,marginTop:8,backgroundColor:sendAmount===item ? color.primary : '#fff',borderRadius:8,paddingHorizontal:16,paddingVertical:12,boxShadow:'0 1 3 .5 #ccc'}}>
                                    <Text style={[fonts.medium,{fontSize:16,color:sendAmount===item ? '#fff' : "#000"}]} >₺{item}</Text>
                            </View>
                       </Pressable>
                    ))
                }
            </View>

        </View>
        <Pressable onPress={sendBalanceHandler}>
            <View style={{width:width*.9,backgroundColor:color.primary,paddingVertical:12,borderRadius:8,marginHorizontal:'auto',marginBottom:height*.025}}>
                <Text style={[fonts.semibold,{fontSize:16,color:'#fff',textAlign:'center'}]}>Gönder</Text>
            </View>
        </Pressable>
    </SafeAreaView>
  )
}

export default SendBalance