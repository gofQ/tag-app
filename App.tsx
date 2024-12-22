import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import Root from './src/router/Root'
import { Provider } from 'react-redux'
import store from './src/redux/store'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const App = () => {
  return (
    <>
    <StatusBar barStyle="light-content" backgroundColor={"#000"} />
    <Provider store={store}>
      <SafeAreaProvider style={{flex: 1}}>
        <Root />
      </SafeAreaProvider>
    </Provider>
    </>
  )
}

export default App