import { View, Text, SafeAreaView as Safe, StyleProp, ViewStyle } from 'react-native'
import React from 'react'

type Props={
    children:React.ReactNode
    style?:StyleProp<ViewStyle>
}

const SafeAreaView:React.FC<Props> = ({children,style}) => {
  return (
    <Safe style={[{flex:1,backgroundColor:'#fafafa'},style]}>
      {children}
    </Safe>
  )
}

export default SafeAreaView