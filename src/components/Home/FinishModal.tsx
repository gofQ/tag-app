import { View, Text, Modal as Modall, Dimensions, Pressable } from 'react-native'
import React from 'react'
import { color, fonts } from '../../utils/constants'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { useEndRentalMutation } from '../../redux/services/rental'

const {width,height}=Dimensions.get('window')

type FinishModalProps={
    currentScooter:any,
    scooter:any,
    location:any,
    setEndRide:any,
    endRide:any,
    remainingTime:any,
    refetch:any
}

const FinishModal = ({currentScooter,scooter,location,setEndRide,endRide,remainingTime,refetch}:FinishModalProps) => {
    const [endRental,{isError}]=useEndRentalMutation()

    if(isError) console.log('endRental error')

    const endRideHandler=async()=>{
        try{
          const remainingBatteryLevel=()=>{
            const duration=currentScooter?.data?.duration*60*60*1000
            const elapsed=(Date.now()-new Date(currentScooter?.data?.start_time).getTime())/5
            const batteryLevel=currentScooter?.data?.battery_level
            const remainingBattery=batteryLevel-(elapsed/duration)*batteryLevel
            return remainingBattery.toFixed()
          }
    
          const battery=remainingBatteryLevel()
          const data={
            scooter_id:scooter?.scooter_id,
            latitude:location?.latitude,
            longitude:location?.longitude,
            battery_level:battery
          }
          const response=await endRental(data).unwrap()
          refetch()
          console.log(response)
          if(response){
            setEndRide()
          } else {
            console.log('error')
          }
      
        } catch(e){ 
          console.log(e)
        }
      }
    

  return (
    <Modall animationType="fade" visible={endRide} transparent>
            <View
              style={{
                flex: 1,
                backgroundColor: '#00000050',
                justifyContent: 'flex-end',
              }}>
              <View
                style={{
                  backgroundColor: '#fff',
                  width: width,
                  padding: 24,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  position: 'relative',
                  height: height * 0.475,
                }}>
                <FontAwesome5Icon name="times" size={24} color="#000" style={{alignSelf: 'flex-end'}} onPress={setEndRide}
                />
                <View style={{width: width * 0.9, marginHorizontal: 'auto',justifyContent:'space-between',flex:1}}>
                  <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <MaterialIcons name="scooter" size={84} color={color.primary} />
                    <Text
                      style={[
                        fonts.semibold,
                        {
                          fontSize: 24,
                          textAlign: 'center',
                          marginTop: 8,
                          color: '#000',
                        },
                      ]}>
                      {scooter?.model}
                      <Text style={{fontSize: 16}}> ({scooter?.year})</Text>
                    </Text>
                    
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 12,
                        alignItems: 'center',
                        marginTop: 8,
                      }}>
                      <FontAwesome5Icon
                        name="battery-full"
                        size={20}
                        color={
                          scooter?.battery_level >= 80
                            ? color.primary
                            : scooter?.battery_level < 80 &&
                              scooter?.battery_level > 30
                            ? 'orange'
                            : 'red'
                        }
                      />
                      <Text style={[fonts.medium, {fontSize: 16, color: '#000'}]}>
                        {scooter?.battery_level}%
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center', marginTop: 12,}}>
                      <FontAwesome5Icon name="money-bill-wave" size={20} color={color.primary}/>
                      <Text style={[fonts.medium, {fontSize: 16, color: '#000'}]}>
                       {scooter?.total_price} TL ödedin
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center', marginTop: 12,}}>
                      <FontAwesome5Icon name="clock" size={20} color={color.primary}/>
                      <Text style={[fonts.medium, {fontSize: 16, color: '#000'}]}>
                       {remainingTime} kaldı
                      </Text>
                    </View>
                  </View>
                  <Pressable onPress={endRideHandler}>
                    <View style={{backgroundColor: color.primary, padding: 8, borderRadius: 8, marginTop: 16}}>
                      <Text style={[fonts.semibold, {fontSize: 16, color: '#fff', textAlign: 'center'}]}>Bitir</Text>
                    </View>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modall>
  )
}

export default FinishModal