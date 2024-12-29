import { PermissionsAndroid } from 'react-native';

export const requestLocationPermission = async () => {
    try {
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Lokasyon İzni',
            message: 'Sürüş yapabilmeniz için konum bilgilerinize ihtiyacımız var. İzin verir misiniz?',
            buttonNeutral: 'Daha Sonra Sor',
            buttonNegative: 'İptal',
            buttonPositive: 'İzin ver',
          },
        );

        const permission2=await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          {
            title: 'Lokasyon İzni',
            message: 'Sürüş yapabilmeniz için konum bilgilerinize ihtiyacımız var. İzin verir misiniz?',
            buttonNeutral: 'Daha Sonra Sor',
            buttonNegative: 'İptal',
            buttonPositive: 'İzin ver',
          },
        );

        if (permission === 'granted' && permission2==='granted') {
          return true;
        } else {
          return false;
        }
      } catch (err) {
        return false;
      }
}