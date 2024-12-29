import { View, Text, Dimensions, TextInput, Pressable } from 'react-native'
import React from 'react'
import SafeAreaView from '../components/global/SafeAreaView'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { color, fonts } from '../utils/constants'
import { useUpdateUserMutation } from '../redux/services/user'
import Alert from '../components/global/Alert'


const {width,height}=Dimensions.get('window')

const Input=({value,setState}:any)=>{
  return(
    <View style={{borderWidth:1,borderColor:'#00000033',borderRadius:8,paddingHorizontal:8}}>
              <TextInput placeholder='Adınız' style={[fonts.medium,{backgroundColor:'transparent',fontSize:16}]}  value={value} readOnly={setState ? false : true} onChangeText={setState} />
        </View>
  )
}

const SProfile = ({navigation}:any) => {
  const [updateUser]=useUpdateUserMutation()
  const user=useSelector((state:RootState)=>state.main.userInfos)
  const birth_date=new Date(user?.birth_date).toLocaleDateString('tr-TR')
  const p=user?.phone_number?.slice(3)
  const [showAlert, setShowAlert] = React.useState(false)
  const [alertMessage, setAlertMessage] = React.useState('')
  const [alertTitle, setAlertTitle] = React.useState('')
  const [info,setInfo]=React.useState({
    phone:p,
    email:user?.email,
    first_name:user?.first_name,
    last_name:user?.last_name,
  })

  const updateUserHandler=async()=>{
    if(info.first_name.trim()==='' || info.last_name.trim()==='' || info.email.trim()==='' || info.phone.trim()===''){
      setAlertMessage('Tüm alanları doldurunuz')
      setAlertTitle('Hata')
      setShowAlert(true)
      return
    }
    if(info.phone.length!==10){
      setAlertMessage('Telefon numarası hatalı')
      setAlertTitle('Hata')
      setShowAlert(true)
      return
    }

    if(!info.email.includes('@') || !info.email.includes('.')){
      setAlertMessage('Email adresi hatalı')
      setAlertTitle('Hata')
      setShowAlert(true)
      return
    }

    const data={
      first_name:info.first_name,
      last_name:info.last_name,
      email:info.email,
    }
    console.log(data)
    try{
      const response=await updateUser(data).unwrap()
      console.log(response)
      if(response){
        setAlertMessage('Kullanıcı bilgileri güncellendi')
        setAlertTitle('Başarılı')
        setShowAlert(true)
        navigation.navigate('Home')
      } 
    } catch(e){
      setAlertMessage('Bir hata oluştu')
      setAlertTitle('Hata')
      setShowAlert(true)
      console.log(e)
    }

  }

  return (
    <SafeAreaView style={{justifyContent:'space-between'}}>
      <Alert  title={alertTitle} message={alertMessage} visible={showAlert} onClose={()=>setShowAlert(false)} />
        <View style={{width:width*.85,marginTop:height*.05,marginHorizontal:'auto',gap:16}}>
           <Input value={info?.first_name} setState={(text:any)=>setInfo({...info,first_name:text})}/>
            <Input value={info?.last_name} setState={(text:any)=>setInfo({...info,last_name:text})}/>
            <Input value={birth_date}/>
            <Input value={info?.email} setState={(text:any)=>setInfo({...info,email:text})}/>
            <View style={{flexDirection:'row'}}>
              <View style={{borderWidth:1,borderColor:'#00000033',borderRadius:8,paddingHorizontal:8,width:width*.15}}>
                <TextInput placeholder='Şifre' value='+90' style={[fonts.medium,{backgroundColor:'transparent',fontSize:16}]}  readOnly />
              </View>
              <View style={{width:width*.05}}></View>
              <View style={{borderWidth:1,borderColor:'#00000033',borderRadius:8,paddingHorizontal:8,width:width*.65}}>
                <TextInput placeholder='Telefon Numaran' value={info.phone} style={[fonts.medium,{backgroundColor:'transparent',fontSize:16}]} onChangeText={(text)=>setInfo({...info,phone:text})}  />
              </View>

            </View>
        </View>
        <Pressable onPress={updateUserHandler}>
            <View style={{width:width*.85,backgroundColor:color.primary,paddingVertical:12,borderRadius:8,marginHorizontal:'auto',marginTop:height*.05,marginBottom:height*.04}}>
                <Text style={[fonts.semibold,{fontSize:16,color:'#fff',textAlign:'center'}]}>Güncelle</Text>
            </View>
        </Pressable>
    </SafeAreaView>
  )
}

export default SProfile