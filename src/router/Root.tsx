import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../pages/Home'
import Profile from '../pages/Profile'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Wallet from '../pages/Wallet'
import Header from '../components/global/Header'
import Campaigns from '../pages/Campaigns'
import Login from '../pages/Login'
import AutoReload from '../pages/AutoReload'
import AccountActivities from '../pages/AccountActivities'
import AddBalance from '../pages/AddBalance'
import CCPage from '../pages/CCPage'
import Notifications from '../pages/Notifications'
import Settings from '../pages/Settings'
import SProfile from '../pages/SProfile'
import SupportCenter from '../pages/SupportCenter'
import NotificationPage from '../pages/NotificationPage'
import Billing from '../pages/Billing'
import SendBalance from '../pages/SendBalance'

const Stack=createNativeStackNavigator()

const Root = () => {
const inset=useSafeAreaInsets()
  return ( 
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name="Login" component={Login} options={{
              headerShown:false
              }} />
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
                  <Header props={props} canGoBack title='Kampanyalar'  />
                ) 
              },
            }} />
            <Stack.Screen name='AutoReload' component={AutoReload} options={{
              header(props) {
                return (
                  <Header props={props} canGoBack title='Otomatik Yenileme'  />
                ) 
              },
            }} />
            <Stack.Screen name='AccountActivities' component={AccountActivities} options={{
              header(props) {
                return (
                  <Header props={props} canGoBack title='Hesap Hareketleri'  />
                ) 
              },
            }} />
            <Stack.Screen name='AddBalance' component={AddBalance} options={{
              header(props) {
                return (
                  <Header props={props} canGoBack title='Bakiye Ekle'  />
                ) 
              },
            }} />
            <Stack.Screen name='CCPage' component={CCPage} options={{
              header(props) {
                return (
                  <Header props={props} canGoBack title='Ödeme Yöntemleri'  />
                )
              },
            }} />
            <Stack.Screen name="Notifications" component={Notifications} options={{
              header(props) {
                return (
                  <Header props={props} canGoBack title='Bildirimler'  />
                ) 
              },
            }} />
            <Stack.Screen name='Settings' component={Settings} options={{
              header(props) {
                return (
                  <Header props={props} canGoBack title='Ayarlar'  />
                ) 
              },
            }} />
            <Stack.Screen name='SProfile' component={SProfile} options={{
              header(props) {
                return (
                  <Header props={props} canGoBack title='Profil'  />
                ) 
              },
            }} />
            <Stack.Screen name='SupportCenter' component={SupportCenter} options={{
              header(props) {
                return (
                  <Header props={props} canGoBack title='Yardım Merkezi'  />
                ) 
              },
            }} />
            <Stack.Screen name="NotificationPage" component={NotificationPage} options={{
              header(props) {
                return (
                  <Header props={props} canGoBack title='Bildirimler'  />
                ) 
              },
            }} />
            <Stack.Screen name="Billing" component={Billing} options={{
              header(props) {
                return (
                  <Header props={props} canGoBack title='Fatura Adresleri'  />
                ) 
              },
            }}/>
            <Stack.Screen name="SendBalance" component={SendBalance} options={{
              header(props) {
                return (
                  <Header props={props} canGoBack title='Bakiye Gönder'  />
                ) 
              },
            }} />
        </Stack.Navigator> 
    </NavigationContainer>
  )
}

export default Root