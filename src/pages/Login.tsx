import { View, Text, Dimensions, TextInput,StyleSheet, Pressable, Modal, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import SafeAreaView from '../components/global/SafeAreaView'
import { color, fonts } from '../utils/constants'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons'
import  FontAwesome5IconButton  from 'react-native-vector-icons/FontAwesome5'
import { useCheckPhoneMutation } from '../redux/services/funcs'
import Alert from '../components/global/Alert'
import Loading from '../components/global/Loading'
import { useLoginMutation, useRegisterMutation } from '../redux/services/auth'
import { saveToken, getToken } from '../utils/as'
import DatePicker from 'react-native-date-picker'
import kvkktext from '../utils/json/kvkktext.json'
import onay from '../utils/json/onay.json'

const Login = ({navigation}:any) => {
    const {width,height}=Dimensions.get('window')
    const [checkPhone,{isLoading,isError,isSuccess,isFetching}]=useCheckPhoneMutation()
    const [register,{isLoading:registerLoading,}]=useRegisterMutation()
    const [login,{isLoading:loginLoading,}]=useLoginMutation()
    const [kvkk,setKvkk]=useState(false)
    const [showAlert,setShowAlert]=useState(false)
    const [alertMessage,setAlertMessage]=useState('')
    const [alertTitle,setAlertTitle]=useState('')
    const [modalType,setModalType]=useState('')
    const [registerModal,setRegisterModal]=useState(false)
    const [showDatePicker,setShowDatePicker]=useState(false)
    const [loginInfo,setLoginInfo]=useState({
        phone:'',
        agreement:false,
        name:'',
        birthday:new Date(),
        email:'',
    })
    


    useEffect(()=>{
        const checkLoginStatus = async () => {
            const token = await getToken();
            if (token) {
              navigation.navigate('Home'); 
            }
          };

          checkLoginStatus();
    },[])

    const openModal=(type:string)=>{
        setModalType(type)
        setKvkk(true)
    }

    const acceptAgreement=()=>{
        setLoginInfo({...loginInfo,agreement:true})
        setKvkk(false)
    }

    const loginHandler=async()=>{
        if(loginInfo.phone.length!==10 || loginInfo.phone[0]!=='5' || loginInfo.phone.trim()===""){
            setAlertTitle('Hata')
            setAlertMessage(`Lütfen geçerli bir telefon numarası giriniz.${'\n'}Örnek: 5XX XXX XX XX`)
            setShowAlert(true)
            return
        }

        if(!loginInfo.agreement){
            setAlertTitle('Hata')
            setAlertMessage('KVKK ve Açık Onay Formunu okuyup onaylamalısınız.')
            setShowAlert(true)
            return
        }

        try{
            const phone_number=`+90${loginInfo.phone}`
            const response=await checkPhone({phone_number:phone_number})
            if(!response.error ){
                const loginResponse=await login({phone_number:phone_number})
                if(loginResponse.data.auth){
                    await saveToken(loginResponse.data.token)
                    setLoginInfo({...loginInfo,phone:'',agreement:false})
                    navigation.navigate('Home')
                } else {
                    setAlertTitle('Hata')
                    setAlertMessage('Girişte Bir hata oluştu. Lütfen tekrar deneyin.')
                    setShowAlert(true)
                }
            } else if(response.error.status===404){
               setRegisterModal(true)
            }
        } catch(e){
            console.log(e)
        }


    }

    const registerHandler=async()=>{
        if(loginInfo.name.trim()==="" || loginInfo.name.split(' ').length<=1){
            setAlertTitle('Hata')
            setAlertMessage('Ad ve soyad giriniz.')
            setShowAlert(true)
            return
        }

        if(loginInfo.email.trim()==="" || !loginInfo.email.includes('@') || !loginInfo.email.includes('.')){
            setAlertTitle('Hata')
            setAlertMessage('Geçerli bir email adresi giriniz.')
            setShowAlert(true)
            return
        }

        if(loginInfo.birthday.toLocaleDateString()===new Date().toLocaleDateString()){
            setAlertTitle('Hata')
            setAlertMessage('Doğum tarihi seçmelisiniz.')
            setShowAlert(true)
            return
        }
        
        let name=loginInfo.name.split(' ')
        let last_name=name.pop()
        let first_name=name.join(' ')
        
        const birthdate=loginInfo.birthday.getFullYear()+'-'+(loginInfo.birthday.getMonth()+1)+'-'+loginInfo.birthday.getDate()

        const data={
            first_name,
            last_name,
            email:loginInfo.email,
            phone_number:`+90${loginInfo.phone}`,
            birth_date:birthdate
        }
        console.log(data)
        try{
            const response=await register(data)
            console.log(response)
            if(response.data.success){
                setLoginInfo({
                    phone:'',
                    agreement:false,
                    name:'',
                    birthday:new Date(),
                    email:'',
                })
                setRegisterModal(false)
                setAlertTitle('Başarılı')
                setAlertMessage('Kayıt başarılı. Giriş yapabilirsiniz.')
                setShowAlert(true)
            } else {
                setAlertTitle('Hata')
                setAlertMessage('Kayıt olurken bir hata oluştu. Lütfen tekrar deneyin.')
                setShowAlert(true)
            }
        } catch(e){
            console.log(e)
        }

        


         
    }

    if( loginLoading) return <Loading />

  return (
    <SafeAreaView>
        <Alert visible={showAlert} title={alertTitle} message={alertMessage} onClose={()=>setShowAlert(false)} />
            <Modal visible={registerModal} animationType='fade' >
                <View style={{flex:1,backgroundColor:'#fff',alignItems:'center'}} >
                    <Text style={[fonts.semibold,{fontSize:32,color:'#000',marginTop:height*.1}]}>Kayıt Ol</Text>
                <View style={{width:width*.85,marginTop:16,gap:16}}>
                    <View style={[styles.inputContainer,]}>
                        <TextInput style={[fonts.medium,styles.input]} placeholder='Ad Soyad' value={loginInfo.name}  maxLength={99} onChangeText={(text)=>setLoginInfo({...loginInfo, name: text})} multiline={false} placeholderTextColor={'#00000080'}  />
                    </View>
                    <View style={[styles.inputContainer,]}>
                        <TextInput style={[fonts.medium,styles.input]} placeholder='Email' value={loginInfo.email}  maxLength={99}  onChangeText={(text)=>setLoginInfo({...loginInfo, email: text})} multiline={false} placeholderTextColor={'#00000080'}  />
                    </View>
                    <Pressable onPress={()=>setShowDatePicker(true)}>
                        <View style={[styles.inputContainer,]}>
                            <Text style={[fonts.medium,{color:'#00000099',fontSize:16}]} >{loginInfo.birthday.toLocaleDateString('tr') ?? 'Doğum Tarihi'}</Text>
                            {/* <TextInput style={[fonts.medium,styles.input]} placeholder='Doğum Tarihi' value={loginInfo.birthday}  maxLength={99} onFocus={()=>setShowDatePicker(true)} multiline={false} placeholderTextColor={'#00000080'} /> */}
                        </View>
                    </Pressable>
                    <DatePicker 
                    modal
                    mode='date'
                    open={showDatePicker}
                    date={loginInfo.birthday}
                    onConfirm={(date)=>{
                        setLoginInfo({...loginInfo,birthday:date})
                        setShowDatePicker(false)
                    }}
                    onCancel={()=>setShowDatePicker(false)}
                    maximumDate={new Date(2008,1,1)}
                    minimumDate={new Date(1940,1,1)}
                    />
                    
                    <Pressable onPress={registerHandler}>
                        <View style={{backgroundColor:color.primary,paddingVertical:10,borderRadius:10,width: width*.85,marginTop:20}} >
                            <Text style={[fonts.semibold,{color:'#fff',fontSize:16,textAlign:'center'}]}>Kayıt Ol</Text>
                        </View>
                    </Pressable>
                    
                </View>
                </View>
            </Modal>
        <Modal visible={kvkk} animationType='fade'>
            <View style={{flex:1,backgroundColor:'#fff'}} >
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:16,paddingVertical:12}}>
                    <View style={{width:24}}></View>
                    <Text style={[fonts.semibold,{fontSize:20,color:'#000'}]}>{modalType==="KVKK" ? "KVKK" : modalType==="AOF" && "Açık Onay Formu"}</Text>
                    <Pressable onPress={()=>setKvkk(false)}>
                        <FontAwesome5IconButton name='times' size={24} color='#000' onPress={()=>setKvkk(false)} style={{alignSelf:'flex-end',marginBottom:4}} />
                    </Pressable>
                </View>
                <ScrollView contentContainerStyle={{marginBottom:height*.1,height:height,paddingBottom:height*.1}} style={{width:width*.9,marginHorizontal:'auto',paddingVertical:12,marginTop:height*.01,marginBottom:height*.1}}>
                    <Text style={[fonts.semibold,{fontSize:18,color:'#000'}]}>{modalType==="KVKK" ? "KVKK Gizlilik Sözleşmesi" : modalType==="AOF" && "Açık Onay Formu"}</Text>
                    <Text style={[fonts.normal,{color:'#00000099',fontSize:16,paddingTop:8}]}>{modalType==="KVKK" ? kvkktext.content : modalType==="AOF" && onay.content}</Text>
                </ScrollView>
                <View style={{position:'absolute',bottom:0,width:width,alignItems:'center',paddingVertical:12}}>
                    <Pressable onPress={acceptAgreement}>
                        <View style={{backgroundColor:color.primary,paddingVertical:10,borderRadius:10,width: width*.9,boxShadow:'0 3 10 0 rgba(0,0,0,.2)'}} >
                            <Text style={[fonts.semibold,{color:'#fff',fontSize:16,textAlign:'center'}]}>Okudum</Text>
                        </View>
                    </Pressable>
                </View>
            </View>
        </Modal>
        <View style={{marginTop:height*.15}}>
            <Icon1 name='scooter' size={height*.15} color={color.primary} style={{alignSelf:'center'}}/>
            <Text style={[fonts.semibold,{fontSize:20,textAlign:'center',color:'#000',height:height*.1}]}>Telefon Numaranı Gir</Text>
            <View style={{flexDirection:'row',width: width*.8,marginHorizontal:'auto',gap:24,alignItems:'center',justifyContent:'center',marginTop:height*.025}}>
                <View style={[styles.inputContainer,{width:width*.1}]}>
                    <TextInput style={[fonts.medium,styles.input]} placeholder='' keyboardType='phone-pad' defaultValue='+90' readOnly  />
                </View>
                <View style={[styles.inputContainer,{width:width*.5}]}>
                    <TextInput style={[fonts.medium,styles.input]} placeholder='Telefon Numaran' value={loginInfo.phone} keyboardType='phone-pad' maxLength={10} onChangeText={(text)=>setLoginInfo({...loginInfo, phone: text})} placeholderTextColor={'#00000080'}  />
                </View> 
            </View>
            <View style={{flexDirection:'row',gap:12,alignItems:'center',justifyContent:'center',marginTop:height*.025,width: width*.75,marginHorizontal:'auto'}}>
                {
                    loginInfo.agreement ? 
                        <Icon 
                        name='check-box' 
                        size={24} 
                        color={color.primary} 
                        onPress={()=>setLoginInfo({...loginInfo,agreement:!loginInfo.agreement})}/> 
                    : 
                        <Icon 
                        name='check-box-outline-blank' 
                        size={24} 
                        color={color.primary} 
                        onPress={()=>setLoginInfo({...loginInfo,agreement:!loginInfo.agreement})}/>
                }
                <Text style={[fonts.medium,{color:'#00000099'}]} ><Text onPress={()=>openModal("KVKK")} style={{textDecorationColor:color.primary, textDecorationLine:'underline',color:color.primary}}>KVKK Sözleşmesini</Text> ve <Text onPress={()=>openModal("AOF")} style={{textDecorationColor:color.primary, textDecorationLine:'underline',color:color.primary}}>Açık Onay Formunu</Text> okudum onaylıyorum.</Text>
            </View>
            
            <Pressable onPress={loginHandler}>
                <View style={{backgroundColor:color.primary,paddingVertical:10,borderRadius:10,width: width*.9,boxShadow:'0 3 10 0 rgba(0,0,0,.2)',marginTop:height*.05,marginHorizontal:'auto'}} >
                    <Text style={[fonts.semibold,{color:'#fff',fontSize:16,textAlign:'center'}]}>Devam Et</Text>
                </View>
            </Pressable>
        </View>
    </SafeAreaView>
  )
}

export default Login
const styles = StyleSheet.create({
    inputContainer:{
        borderBottomWidth:1,
        borderBottomColor:'#191919',
        paddingVertical:12,
    },
    input:{
        transform:[{translateY:5}],
        padding:0,
        margin:0,
        fontSize:16,
        textDecorationLine:'none',
        width:'100%',
        height:30
    },


});