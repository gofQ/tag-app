import { View, Text, FlatList } from 'react-native'
import React from 'react'
import SafeAreaView from '../components/global/SafeAreaView'
import { useGetNotificationsQuery } from '../redux/services/notifications'
import Loading from '../components/global/Loading'
import { fonts } from '../utils/constants'

const Notifications = () => {
  const {data,isLoading,isError}=useGetNotificationsQuery()



  if(isLoading) return <Loading/>

  return (
    <SafeAreaView>
       <FlatList
        data={data}
        keyExtractor={(item:any)=>item.id}
        renderItem={({item})=>(
          <View style={{padding:16,borderBottomWidth:1,borderBottomColor:'#ccc'}}>
            <Text style={[fonts.semibold,{fontSize:16,}]} >{item.title}</Text>
            <Text style={[fonts.medium,{fontSize:14}]}>{item.text}</Text>
          </View>
        )}
        ListEmptyComponent={isLoading ? <Loading/> : isError ? <Text style={[fonts.medium,{fontSize:20,color:'#00000070'}]}>Something went wrong</Text> : <Text>No notifications</Text>}
      />
    </SafeAreaView>
  )
}

export default Notifications