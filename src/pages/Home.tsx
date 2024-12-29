import { View, Text, Pressable, StyleSheet, Dimensions, Modal as Modall} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import SafeAreaView from '../components/global/SafeAreaView'
import Geolocation from '@react-native-community/geolocation';
import { color, fonts } from '../utils/constants'
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6'
import Map from '../components/global/Map'
import { requestLocationPermission } from '../utils/Permissions'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../redux/store';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MapView from 'react-native-maps';
import Modal from '../components/Home/Modal';
import { getUserInformations } from '../redux/mainSlicer';
import { useEndRentalMutation, useGetCurrentScooterQuery, useGetScootersQuery } from '../redux/services/rental'
import Loading from '../components/global/Loading';
import ErrorComp from '../components/global/ErrorComp';
import { useIncrementTagByLocationMutation } from '../redux/services/funcs';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FinishModal from '../components/Home/FinishModal';


const {width,height}=Dimensions.get('window')

const Home:React.FC<any> = ({navigation}) => {
  const {data,isLoading,isError,refetch}=useGetScootersQuery()
  const {data:currentScooter,isLoading:isCurrentScooterLoading,isError:isCurrentScooterError}=useGetCurrentScooterQuery()
  const [incrementTagByLocation]=useIncrementTagByLocationMutation()
  const [startRide,setStartRide]=useState(false);
  const [endRide,setEndRide]=useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const mapRef=useRef<MapView>(null)
  const [location,setMyLocation]=useState({
    latitude: 37.78825, 
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421, 
  }); 

  const scooter=currentScooter?.data 

  useEffect(() => {
    const requestPermission = async () => {
      const granted = await requestLocationPermission();
      if (granted) {
        Geolocation.getCurrentPosition(
          position => {
            const {latitude,longitude}=position.coords
            const region={
              latitude,
              longitude,
              latitudeDelta:0.01,
              longitudeDelta:0.01
            }
            setMyLocation(region)
            mapRef.current?.animateToRegion(region,1000)
          },
          error => {
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 30000, maximumAge: 10000},
        );
      }
    }
    requestPermission();  
    dispatch(getUserInformations())
  }, [])

  const findMe=async()=>{
    const granted = await requestLocationPermission();
      if (granted) {
        Geolocation.getCurrentPosition(
          position => {
            const {latitude,longitude}=position.coords
            const region={
              latitude,
              longitude,
              latitudeDelta:0.01,
              longitudeDelta:0.01
            }
            setMyLocation(region)
            mapRef.current?.animateToRegion(region,1000)
          },
          error => {
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
  }

  const wannaMarti=async()=>{
    const {latitude,longitude}=location
    try{
      const response=await incrementTagByLocation({latitude,longitude}).unwrap()
      console.log(response)
    } catch(e){
      console.log(e)
    }
  }

  const remainingTime = (): { isExpired: boolean; remaining: string } => {
    if (!currentScooter?.data?.start_time || !currentScooter?.data?.duration) return { isExpired: true, remaining: "Geçersiz veri" };
  
    const startTime = new Date(currentScooter?.data?.start_time).getTime();
    if (isNaN(startTime)) return { isExpired: true, remaining: "Geçersiz başlangıç zamanı" };
  
    const currentTime = Date.now();
    const elapsedMilliseconds = currentTime - startTime;
    const durationMilliseconds = currentScooter?.data?.duration * 60 *60 * 1000;
    const remainingMilliseconds = durationMilliseconds - elapsedMilliseconds;
  
    if (remainingMilliseconds <= 0) return { isExpired: true, remaining: "Süre doldu" };
  
    const hours = Math.floor(remainingMilliseconds / (60 * 60 * 1000));
    const minutes = Math.floor((remainingMilliseconds % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((remainingMilliseconds % (60 * 1000)) / 1000);
  
    return { isExpired: false, remaining: `${hours? hours +' saat' : ''} ${minutes} dk ${seconds} sn` };
  };

  
  
  

 if(isLoading || isCurrentScooterLoading) return <Loading/>

  return (
    <SafeAreaView>
      <Modal
        startRide={startRide}
        funcStartRide={() => setStartRide(false)}
        data={data}
        wannaMarti={wannaMarti}
      />

      <FinishModal 
        currentScooter={currentScooter}
        scooter={scooter}
        location={location as any}
        setEndRide={() => setEndRide(false)}
        endRide={endRide}
        remainingTime={remainingTime().remaining}
        refetch={refetch}
      />
      

      <View style={{position: 'absolute', zIndex: 10, top: 15, right: 10}}>
        <Pressable onPress={() => navigation.navigate('Profile')}>
          <View
            style={{
              backgroundColor: 'white',
              gap: 4,
              paddingVertical: 12,
              paddingHorizontal: 10,
              borderRadius: 6,
              boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            }}>
            <View style={styles.menuItem}></View>
            <View style={styles.menuItem}></View>
            <View style={styles.menuItem}></View>
          </View>
        </Pressable>
      </View>
      <Map ref={mapRef} location={location} data={data} />

      <View style={{position: 'absolute', zIndex: 10, bottom: 100, right: 25}}>
        <Pressable onPress={findMe}>
          <View
            style={{
              backgroundColor: 'white',
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderRadius: 6,
              boxShadow: '0 1 10 1 rgba(0,0,0,0.2)',
            }}>
            <FontAwesome6Icon name="location-arrow" size={24} color="black" />
          </View>
        </Pressable>
      </View>

      <View
        style={{
          position: 'absolute',
          zIndex: 10,
          bottom: 30,
          width: width,
          alignItems: 'center',
        }}> 
        {  currentScooter?.data?.status==="in-use" && currentScooter?.data?.end_time===null  ?  (
          <Pressable onPress={() => setEndRide(true)}>
            <View 
              style={{
                backgroundColor: color.primary,
                paddingVertical: 10,
                borderRadius: 10,
                width: width * 0.9,
                boxShadow: '0 3 10 0 rgba(0,0,0,.2)',
              }}>
              <Text
                style={[
                  fonts.semibold,
                  {color: '#fff', fontSize: 16, textAlign: 'center'},
                ]}>
                {currentScooter?.data?.model} ({remainingTime().remaining})
              </Text>
            </View>
          </Pressable>
        ) :  (
          <Pressable onPress={() => setStartRide(true)}>
            <View
              style={{
                backgroundColor: color.primary,
                paddingVertical: 10,
                borderRadius: 10,
                width: width * 0.9,
                boxShadow: '0 3 10 0 rgba(0,0,0,.2)',
              }}>
              <Text
                style={[
                  fonts.semibold,
                  {color: '#fff', fontSize: 16, textAlign: 'center'},
                ]}>
                Sürmeye başla
              </Text>
            </View>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}

export default Home
const styles = StyleSheet.create({
  menuItem:{height: 3,width:25,backgroundColor:'#191919',borderRadius:50}
});