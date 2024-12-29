import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import SafeAreaView from '../components/global/SafeAreaView'
import { fonts } from '../utils/constants'
import { useGetTransactionsQuery } from '../redux/services/balance'
import Loading from '../components/global/Loading'
import ErrorComp from '../components/global/ErrorComp'


const AccountActivities = () => {
  const {data, isLoading, isError} = useGetTransactionsQuery()

  console.log(data)

  if (isLoading) return <Loading/>
  if (isError) return <ErrorComp/>

  return (
    <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false} >
            {
              data? 
              data?.transactions?.map((item:any,index:number)=>(
                <View key={index} style={{borderBottomWidth:1,borderBottomColor:'#00000033',paddingHorizontal:16,paddingVertical:8}}>
                  <Text style={[fonts.medium,{fontSize:16,color:'#000'}]}>İşlem: {item?.transaction_type==="load" ? "Yükleme" : item?.transaction_type}</Text>
                  <Text style={[fonts.medium,{fontSize:16,color:'#000'}]}>Tutar: {item?.amount}</Text>
                  <Text style={[fonts.medium,{fontSize:16,color:'#000'}]}>Tarih: {new Date(item?.created_at).toLocaleString()} </Text>
                </View>
              ))
               : <Text style={[fonts.medium,{fontSize:16,color:'#000',textAlign:'center',marginTop:120}]}>Henüz işlem bulunmamaktadır</Text>
            }
        </ScrollView> 
    </SafeAreaView>
  )
}

export default AccountActivities