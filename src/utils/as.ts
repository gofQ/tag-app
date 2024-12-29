import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToken = async (token:any) => {
    try {
      await AsyncStorage.setItem('userToken', token);
    } catch (error) {
      console.error('Token kaydedilemedi:', error);
    }
  };
  

export const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token !== null) {
        return token;
      };
      return null;
    } catch (error) {
      console.error('Token alınırken hata oluştu:', error);
      return null;
    }
  };
  
 export const clearToken = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
    } catch (error) {
      console.error('Token silinirken hata oluştu:', error);
    }
  };
  