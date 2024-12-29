import React, { forwardRef, memo } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const customMapStyle = [
  {
    elementType: 'geometry',
    stylers: [{ color: '#f5f5f5' }],
  },
  {
    elementType: 'labels.icon',
    stylers: [{ visibility: 'off' }],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ color: '#616161' }],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#f5f5f5' }],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#bdbdbd' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#ffffff' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#c9c9c9' }],
  },
];

type Props = {
  location: any;
  data: any;
};

const Map = forwardRef<MapView, Props>(({ location,data }, ref) => {
  console.log('Map rendered');
  console.log(data)
  return (
    <MapView
      ref={ref}
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      customMapStyle={customMapStyle}
      userInterfaceStyle="dark"
      showsBuildings={false}
      showsUserLocation={true}
      showsMyLocationButton={false}
      followsUserLocation={false}
      mapType="standard"
      showsTraffic={false}
      showsPointsOfInterest={false}
      showsIndoors={false}
      initialRegion={location}
    >
    {
      data && data?.map((item:any)=>(
        <Marker
          key={item?.id}
          coordinate={{
            latitude: parseFloat(item?.latitude),
            longitude: parseFloat(item?.longitude),
          }}
          title={item?.model}
          description={'Battery Level: '+item?.battery_level}
        />
      ))
    }

  </MapView>
  );
});

export default memo(Map);

const styles = StyleSheet.create({
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
});
