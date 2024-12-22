import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../pages/Home'
import Profile from '../pages/Profile'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Wallet from '../pages/Wallet'
import Header from '../components/global/Header'
import Campaigns from '../pages/Campaigns'

const Stack=createNativeStackNavigator()

const Root = () => {
const inset=useSafeAreaInsets()
  return ( 
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home}
            options={{
              headerShown:false
            }} />
            <Stack.Screen name='Profile' component={Profile} options={{
              header(props) {
                return (
                  <Header props={props} canGoBack notify />
                ) 
              },
            }} />
            <Stack.Screen name='Wallet' component={Wallet} options={{
              header(props) {
                return (
                  <Header props={props} canGoBack  />
                ) 
              },
            }} />
            <Stack.Screen name="Campaign" component={Campaigns} options={{
              header(props) {
                return (
                  <Header props={props} canGoBack  />
                ) 
              },
            }} />
            
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Root