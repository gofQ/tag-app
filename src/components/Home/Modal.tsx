import { View, Text, Pressable, Modal as Modall, Dimensions, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { color, fonts } from '../../utils/constants'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import axios from 'axios'
import { useRentScooterMutation } from '../../redux/services/rental'
import { useIncrementTagByLocationMutation } from '../../redux/services/funcs'
import { GOOGLEMAPSAPIKEY } from '../../utils/config'


type Props={
    startRide:boolean,
    funcStartRide:()=>void,
    data?:any,
    wannaMarti:()=>void
}

const {width,height}=Dimensions.get('window')

const Modal:React.FC<Props> = ({startRide,funcStartRide,data,wannaMarti}) => {
    const [rentScooter]=useRentScooterMutation()
    
    const [status,setStatus]=useState(false);
    const [thanks,setThanks]=useState(false);
    const [marti,setMarti]=useState(null);
    const [showMarti,setShowMarti]=useState(false);
    const [selectedHour,setSelectedHour]=useState<any>(undefined)
    const [price,setPrice]=useState<any>(undefined)
    const selectedMarti=data?.find((item:any)=>item?.id===marti)
    


    const iWantMarti=async()=>{
        wannaMarti()
        setStatus(false)
        setThanks(true)
    }

    const closeModal=()=>{
        setThanks(false)
        funcStartRide()
    }

    const showMartiHandler=(id:any)=>{
        setMarti(id)
        setShowMarti(true)
    }

    const closeMarti=()=>{
        setShowMarti(false)
        setMarti(null)
    }

    const rentScooterHandler=async()=>{
        if(!selectedHour || !price){
            console.log('Lütfen süre seçiniz')
            return
        }

        try{
            const data={
                scooter_id:marti,
                duration:selectedHour===60? 1 : selectedHour===120? 2 : selectedHour===180? 3 : selectedHour===240? 4 : selectedHour===300 && 5,
                total_price:price
            }
            const response=await rentScooter(data).unwrap()
            if(response.remaining_balance){

                closeMarti()
                closeModal()
            } else {
                 console.log('Bir hata oluştu')
            }
        } catch(e){
             console.log(e)
        } 
    }
   
    const getAddress: any = async (selectedMarti:any) => {
        if (!selectedMarti?.latitude || !selectedMarti?.longitude) {
          console.log('Invalid latitude or longitude');
          return;
        }
      
        try {
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${selectedMarti.latitude},${selectedMarti.longitude}&key=${GOOGLEMAPSAPIKEY}`
          );
      
          if (response.data.results && response.data.results.length > 0) {
            const formattedAddress = response.data.results[0].formatted_address;
      
            const addressComponents = response.data.results[0].address_components;
            const city = addressComponents.find((component: { types: string | string[] }) =>
              component.types.includes('administrative_area_level_1')
            )?.long_name;
            const district = addressComponents.find((component: { types: string | string[] }) =>
              component.types.includes('administrative_area_level_2')
            )?.long_name;
      
            return formattedAddress;
          } else {
            console.log('No results found');
            return;
          }
        } catch (error: any) {
          console.log('Error occurred:', error.response?.data || error.message);
        }
      };

   

      const availableMartis = data?.filter((item:any)=>item?.status==='available').length
     

  return (
   

    <Modall visible={startRide} animationType='fade' transparent={true}>
    <Modall visible={status} animationType='fade' transparent={true} style={{zIndex:999}} >
        <View style={{flex:1,backgroundColor:'#00000050',justifyContent:'flex-end'}}>
            <View style={{backgroundColor:'#fff',width:width,padding:24,borderTopLeftRadius:20,borderTopRightRadius:20, position:'relative',height:height*.24,}} >
                <Pressable onPress={()=>setStatus(false)} style={{position:'absolute',top:15,right:20,zIndex:999}}>
                    <FontAwesome5Icon name="times" size={24} color='black'/>
                </Pressable>
                <View style={{alignItems:'center',justifyContent:'center'}}>
                    <MaterialIcons name='bird' size={48} color={color.primary} />
                    <Text style={[fonts.normal,{fontSize:14,textAlign:'center',marginTop:8,color:"#00000099"}]}>Bulunduğunuz bölgede hangi tip Martı görmek istersiniz?</Text>
                    <Pressable onPress={iWantMarti}>
                        <View style={{flexDirection:'row',marginTop:4,borderBottomWidth:1,width: width*.8,justifyContent:'space-evenly',paddingBottom:8,borderBottomColor:'#00000050'}}>
                            <MaterialIcons name='scooter' size={32} color={color.primary} />
                            <Text style={[fonts.medium,{fontSize:14,textAlign:'center',marginTop:8,color:'#00000099'}]}>Martı</Text>
                        </View>
                    </Pressable>
                </View>
            </View>
        </View>
    </Modall>
          <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.5)',justifyContent:'flex-end'}}>
            {
                data &&  availableMartis>0 ? 
                <View style={{backgroundColor:"#fff",width:width,padding:24,borderTopLeftRadius:20,borderTopRightRadius:20, position:'relative',height:height*.8}} >
                    <Modall visible={showMarti} animationType='fade' transparent={true} >
                        <View style={{flex:1,backgroundColor:'#00000050',justifyContent:'flex-end'}}>
                            <View style={{backgroundColor:'#fff',width:width,padding:24,borderTopLeftRadius:20,borderTopRightRadius:20, position:'relative',height:height*.55,justifyContent:'space-between'}} >
                                <>
                                <Pressable onPress={closeMarti} style={{position: 'absolute',top:15,right:20}}>
                                    <FontAwesome5Icon name="times" size={24} color='black'  />
                                </Pressable>
                                <View style={{alignItems:'center',justifyContent:'center'}}>
                                    <MaterialIcons name='scooter' size={84} color={color.primary} />
                                    <Text style={[fonts.semibold,{fontSize:24,textAlign:'center',marginTop:8,color:"#000"}]}>{selectedMarti?.model}<Text style={{fontSize:16}}> ({selectedMarti?.year})</Text></Text>
                                    <View style={{flexDirection:'row',gap:12,alignItems:'flex-start',marginTop:8}} >
                                        <FontAwesome5Icon name='map-marker-alt' size={20} color={color.primary} />
                                        <Text style={[fonts.medium,{fontSize:16,color:'#000',textAlign:'center'}]}>{getAddress(selectedMarti)}</Text>
                                    </View>
                                    <View style={{flexDirection:'row',gap:12,alignItems:'center',marginTop:8}}>
                                        <FontAwesome5Icon name='battery-full' size={20} color={selectedMarti?.battery_level>=80?color.primary:selectedMarti?.battery_level<80 && selectedMarti?.battery_level>30?'orange':'red'} />
                                        <Text style={[fonts.medium,{fontSize:16,color:'#000'}]}>{selectedMarti?.battery_level}%</Text>
                                    </View>
                                    <View style={{flexDirection:'row',gap:12,alignItems:'center',marginTop:8}}>
                                        <FontAwesome5Icon name='money-bill-wave' size={20} color={color.primary} />
                                        <Text style={[fonts.medium,{fontSize:16,color:'#000'}]}>{selectedMarti?.price_per_hour} TL (Saatlik)</Text>
                                    </View>
                                </View>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{flexDirection:'row',marginTop:16}}>
                                    {
                                        [60,120,180,240,300].map((item,index)=>{
                                            const select=()=>{
                                                setSelectedHour(item)
                                                if(item===60){
                                                    setPrice(selectedMarti?.price_per_hour)
                                                } else if (item===120){
                                                    setPrice(selectedMarti?.price_per_hour*2)
                                                } else if (item===180){
                                                    setPrice(selectedMarti?.price_per_hour*3)
                                                } else if(item===240) {
                                                    setPrice(selectedMarti?.price_per_hour*4)
                                                } else if(item===300){
                                                    setPrice(selectedMarti?.price_per_hour*5)
                                                } 
                                            }
                                            return(
                                                <Pressable key={index} onPress={select}  >
                                                    <View style={{backgroundColor:selectedHour===item? color.primary : '#fff',paddingVertical:8,paddingHorizontal:16,borderRadius:8,marginRight:8,boxShadow:'0 1 3 .5 #ccc'}}>
                                                        <Text style={[fonts.semibold,{fontSize:16,color:selectedHour===item ? '#fff' :'#000'}]}>{item}dk</Text>
                                                    </View>
                                                </Pressable>
                                            )
                                        })
                                        
                                    }
                                </ScrollView>
                                </>
                                <Pressable onPress={rentScooterHandler}>
                                    <View style={{backgroundColor:color.primary,paddingVertical:12,borderRadius:8,marginTop:16}}>
                                        <Text style={[fonts.semibold,{fontSize:16,color:'#fff',textAlign:'center'}]}>Sürmeye Başla {selectedHour? `(${selectedHour}dk)` : null} {price? `(${price}TL)` :null}</Text>
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                    </Modall>
                     <FontAwesome5Icon name="times" size={24} color='black' style={{position: 'absolute',top:15,right:20}} onPress={closeModal}/>
                    <Text style={[fonts.medium,{fontSize:18,color:'#000',textAlign:'center',marginTop:12}]}>Yakınındaki Martılar</Text>
                    <ScrollView style={{flexDirection:'column', gap:16,marginTop:8,paddingBottom:24}} showsVerticalScrollIndicator={false}>
                        {
                            data?.map((item:any,index:number)=>{

                                const colors=item?.battery_level>=80?color.primary:item?.battery_level<80 && item?.battery_level>30?'orange':'red' 

                                if(item?.status==='in-use') return null
                                if(item?.status==='notAvailable') return null

                                return(
                                    <Pressable onPress={()=>showMartiHandler(item?.id)} key={index} >
                                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',boxShadow:'0 1 5 0 #ccc',marginTop:16,borderRadius:10,paddingHorizontal:16,paddingVertical:12,backgroundColor:'#f9f9f9',}} >
                                        <View style={{flexDirection:'column',alignItems:'flex-start',gap:6}} >
                                                <View style={{flexDirection:'row',gap:10,alignItems:'center'}}>
                                                    <FontAwesome5Icon name='map-marker-alt' size={20} color={color.primary} style={{alignSelf:'center'}}/>
                                                    <Text style={[fonts.medium,{fontSize:16,color:'#000'}]}>{getAddress(item)}</Text>
                                                </View>
                                                <View style={{flexDirection:'row',gap:32,alignItems:'center'}}>
                                                    <View style={{flexDirection:'row',gap:10,alignItems:'center'}}>
                                                        <MaterialIcons name='scooter' size={20} color={color.primary} style={{alignSelf:'center'}}/>
                                                        <Text style={[fonts.medium,{fontSize:16,color:'#000'}]}>{item?.model}</Text>
                                                    </View> 
                                                    <View style={{flexDirection:'row',gap:10,alignItems:'center'}}>
                                                        <FontAwesome5Icon name='battery-full' size={20} color={colors} style={{alignSelf:'center'}}/>
                                                        <Text style={[fonts.medium,{fontSize:16,color:'#000'}]}>{item?.battery_level}%</Text>
                                                    </View>
                                                </View>
                                                <View style={{flexDirection:'row',gap:10,alignItems:'center'}}>
                                                    <FontAwesome5Icon name='money-bill-wave' size={20} color={color.primary} style={{alignSelf:'center'}}/>
                                                    <Text style={[fonts.medium,{fontSize:16,color:'#000'}]}>{item?.price_per_hour} TL</Text>
                                                </View>
                                                
                                        </View>
                                        {/* <View style={{flexDirection:'column',alignItems:'center',gap:6,marginRight:16,justifyContent:'center'}} >
  
                                                {   
                                                      item?.status==='available' && item?.battery_level >= 80 ?
                                                        <Pressable onPress={()=>showMartiHandler(item?.id)} >
                                                        <MaterialIcons name='bird' size={32} color={color.primary} />
                                                         <Text style={[fonts.medium,{fontSize:16,color:'#000'}]}>Sür</Text>
                                                        </Pressable>
                                                    : item?.status==='available' && item?.battery_level <80 && item?.battery_level > 30 ?
                                                        <Pressable onPress={()=>showMartiHandler(item?.id)} >
                                                            <MaterialIcons name='bird' size={32} color='orange' />
                                                            <Text style={[fonts.medium,{fontSize:16,color:'#000'}]}>Sür</Text>
                                                        </Pressable>
                                                    : item?.status==='available' && item?.battery_level <= 30 ?
                                                        <Pressable onPress={()=>showMartiHandler(item?.id)} >
                                                            <MaterialIcons name='bird' size={32} color='red' />
                                                            <Text style={[fonts.medium,{fontSize:16,color:'#000'}]}>Sür</Text>
                                                        </Pressable>
                                                    : item?.status==='available'?
                                                        <Pressable onPress={()=>showMartiHandler(item?.id)} >
                                                            <MaterialIcons name='bird' size={32} color={color.primary} />
                                                            <Text style={[fonts.medium,{fontSize:16,color:'#000'}]}>Sür</Text>
                                                        </Pressable>
                                                    : item?.status==='inUse'?
                                                        <MaterialIcons name='bird' size={32} color='#ccc' />
                                                    : null
                                                }
                                           
                                        </View> */}
                                    </View>
                                    </Pressable>
                                )
                            })
                        }
                    </ScrollView>
                </View>
                :
                <View style={{backgroundColor:"#fff",width:width,padding:24,borderTopLeftRadius:20,borderTopRightRadius:20, position:'relative',height:thanks? height*.2:height*.3,}} >
            <FontAwesome5Icon name="times" size={24} color='black' style={{position: 'absolute',top:15,right:20}} onPress={closeModal}/>
              {
                thanks?
                    <>
                    <FontAwesome5Icon name='grin-stars' size={54} color={color.primary} style={{alignSelf:'center',marginTop:8}}/>
                    <Text style={[fonts.medium,{fontSize:18,textAlign:'center',marginTop:20}]}>En yakın zamanda Martı orada olacak.</Text>
                    </>
                :
                <>
                <FontAwesome5Icon name='sad-cry' size={54} color={color.primary} style={{alignSelf:'center',marginTop:8}}/>
                <Text style={[fonts.medium,{fontSize:18,textAlign:'center',marginTop:20}]}>Şanssızlığa bak çevrende hiç martı yok.</Text>
                <Pressable onPress={()=>setStatus(true)}>
                  <View style={{backgroundColor:color.primary,paddingVertical:10,borderRadius:10,marginTop:20}}>
                    <Text style={[fonts.semibold,{color:'#fff',fontSize:16,textAlign:'center'}]}>Burada Martı istiyorum</Text>
                  </View>
                </Pressable>
                </>
              }
            </View>
            }
          </View>
        </Modall>
        
  )
}

export default Modal
const styles = StyleSheet.create({
    
});