import { View, Text, Pressable } from 'react-native'
import React from 'react'
import SafeAreaView from '../components/global/SafeAreaView'
import MapView from 'react-native-maps'

const Home:React.FC<any> = ({navigation}) => {
  return (
   <SafeAreaView>
    <MapView
      style={{flex:1}}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    />
   </SafeAreaView>
  )
}

export default Home