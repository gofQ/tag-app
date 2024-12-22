import { View, Text, StyleSheet } from 'react-native'
import React, { memo } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import FAIcon from 'react-native-vector-icons/FontAwesome6'
import FIcon from 'react-native-vector-icons/FontAwesome5'
import { color } from '../../utils/constants'


type Props={
    props:any,
    notify?:boolean,
    canGoBack?:boolean,
    title?:string

}


const Header:React.FC<Props> = ({props,title,notify,canGoBack}) => {
    const inset=useSafeAreaInsets()
  return (
    <View style={[styles.container,{paddingTop:inset.top+4}]}>
        {
            canGoBack ? <FAIcon name='arrow-left-long' size={24} color={color.primary} onPress={() => props.navigation.goBack()} /> : <View style={{width:24}}/>
        }
        <Text>{title?? ''}</Text>
        {
            notify ? <FIcon name='bell' size={24} color={color.primary}/> : <View style={{width:24}}/>
        }
    </View>
  )
}

export default memo(Header)
const styles = StyleSheet.create({
    container:{flexDirection:'row', height: 55, justifyContent: 'space-between', alignItems: 'center',paddingHorizontal:16,backgroundColor:'#fafafa'}
});