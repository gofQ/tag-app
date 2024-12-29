import { View, Text, Pressable, Modal, Dimensions, TextInput } from 'react-native'
import React, { memo } from 'react'
import SafeAreaView from '../components/global/SafeAreaView'
import { useAddBillingAddressMutation, useGetBillingAddressQuery } from '../redux/services/billing'
import Loading from '../components/global/Loading'
import ErrorComp from '../components/global/ErrorComp'
import { color, fonts } from '../utils/constants'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import Alert from '../components/global/Alert'

const Input=memo(({value,func,ph}:any)=>{
    return(
        <View style={{borderWidth:1,borderColor:'#00000033',borderRadius:8,paddingHorizontal:8}} >
            <TextInput placeholder={ph} style={[fonts.medium,{fontSize:16,color:'#000'}]} value={value} onChangeText={func} placeholderTextColor={"#00000070"} />
        </View>
    )
})

const Billing = () => {
    const {data, isLoading, isError} = useGetBillingAddressQuery()
    const [addBillingAddress,{isLoading:isAdding,isError:isAddError}]=useAddBillingAddressMutation()
    const [modalVisible, setModalVisible] = React.useState(false)
    const [showAlert, setShowAlert] = React.useState(false)
    const [alertMessage, setAlertMessage] = React.useState('')
    const [alertTitle, setAlertTitle] = React.useState('')
    const [billingInfo, setBillingInfo] = React.useState({
        city:'',
        district:'',
        neighborhood:'',
        address:''
    })


    if (isLoading) return <Loading/>
    // if (isError) return <ErrorComp/>

    const {width,height}=Dimensions.get('window')

    const addAddress=async()=>{
        if(billingInfo.city.trim()==='' || billingInfo.district.trim()==='' || billingInfo.neighborhood.trim()==='' || billingInfo.address.trim()===''){
            setAlertTitle('Hata')
            setAlertMessage('Tüm alanları doldurunuz')
            setShowAlert(true)
            return
        }

        try{
            const response=await addBillingAddress(billingInfo).unwrap()
            if(response.data){
                console.log(response)
                setAlertTitle('Başarılı')
                setAlertMessage('Adres eklendi')
                setShowAlert(true)
                setModalVisible(false)
                setBillingInfo({
                    city:'',
                    district:'',
                    neighborhood:'',
                    address:'',
                })

            }

        } catch(err){
            setAlertTitle('Hata')
            setAlertMessage('Bir hata oluştu')
            setShowAlert(true)
        }

    }

  return (
    <SafeAreaView>
        <Alert visible={showAlert} title={alertTitle} message={alertMessage} onClose={()=>setShowAlert(false)}/>
        <Modal visible={modalVisible} animationType='fade'>
            <FontAwesome5Icon name='times' size={24} color='#000' style={{alignSelf:'flex-end',margin:16}} onPress={()=>setModalVisible(false)}/>
            <View style={{width:width*.85,marginHorizontal:'auto',marginTop:height*.02}}>
                <Text style={[fonts.semibold,{fontSize:24,color:'#000',textAlign:'center'}]}>Fatura Adresi Ekle</Text>
               <View style={{gap:16,marginTop:height*.025}}>
                    <Input value={billingInfo.city} func={(text:any)=>setBillingInfo({...billingInfo,city:text})} ph='Şehir'/>
                    <Input value={billingInfo.district} func={(text:any)=>setBillingInfo({...billingInfo,district:text})} ph='İlçe'/>
                    <Input value={billingInfo.neighborhood} func={(text:any)=>setBillingInfo({...billingInfo,neighborhood:text})} ph='Mahalle'/>
                    <Input value={billingInfo.address} func={(text:any)=>setBillingInfo({...billingInfo,address:text})} ph='Adres'/>
                    <Pressable onPress={addAddress}>
                        <View style={{backgroundColor:color.primary,paddingVertical:12,borderRadius:8,marginHorizontal:'auto',marginTop:height*.02,width:width*.85}}>
                            <Text style={[fonts.semibold,{fontSize:16,color:'#fff',textAlign:'center'}]}>Ekle</Text>
                        </View>
                    </Pressable>
               </View>
                
            </View>
        </Modal>
        <View>
            <Pressable onPress={()=>setModalVisible(true)}>
                <View style={{flexDirection:'row',alignItems:'center',gap:12,paddingHorizontal:16,paddingVertical:12,borderBottomWidth:1,borderBottomColor:'#ccc'}} >
                    <FontAwesome5Icon name='plus' size={20} color='#000'/>
                    <Text style={[fonts.semibold,{fontSize:16,color:'#000000'}]}>Fatura Adresi Ekle</Text>
                </View>
            </Pressable>
            <View>
                {
                    data ?
                     data?.map((item:any,index:number)=>(
                        <View key={index} style={{paddingHorizontal:16,paddingVertical:12,borderBottomWidth:1,borderBottomColor:'#ccc'}}>
                            <Text style={[fonts.semibold,{fontSize:16,color:'#000'}]}>{item?.district}/{item?.city}</Text>
                            <Text style={[fonts.medium,{fontSize:14,color:"#000"}]}>{item?.neighborhood}, {item?.address}</Text>
                        </View>
                     ))

                    : <Text style={[fonts.medium,{fontSize:16,color:"#00000070"}]}>Adres Bulunamadı</Text>
                }
            </View>
        </View>
    </SafeAreaView>
  )
}

export default Billing