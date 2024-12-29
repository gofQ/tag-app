import {View, Text, Dimensions, Switch, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import SafeAreaView from '../components/global/SafeAreaView';
import {useAddPermissionMutation, useGetPermissionsQuery} from '../redux/services/permissions';
import Loading from '../components/global/Loading';
import ErrorComp from '../components/global/ErrorComp';
import {fonts} from '../utils/constants';
import Alert from '../components/global/Alert';

const {width, height} = Dimensions.get('window');

const SwitchComp = ({value, onChange}: any) => {
  return (
    <Switch
      trackColor={{false: '#ccc', true: '#33d10050'}}
      thumbColor={value ? '#33d100' : '#767577'}
      ios_backgroundColor="#3e3e3e"
      value={value}
      onValueChange={onChange}
    />
  );
};

const NotificationPage = () => {
  const {data, isLoading, isError} = useGetPermissionsQuery();
  const [addPermission]=useAddPermissionMutation()
  const [email, setEmail] = React.useState(data?.email_permission);
  const [phone, setPhone] = React.useState(data?.phone_permission);
  const [sms, setSms] = React.useState(data?.sms_permission);
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  const [alertTitle, setAlertTitle] = React.useState('');


  if (isLoading) return <Loading />;
  
  const updatePermissions=async()=>{
    try{
      const response=await addPermission({email_permission:email,phone_permission:phone,sms_permission:sms}).unwrap()
      if(response.data){
        setAlertTitle('Başarılı')
        setAlertMessage('İzinler güncellendi')
        setShowAlert(true)
      } else {
        setAlertTitle('Hata')
        setAlertMessage('Bir hata oluştu')
        setShowAlert(true)
      }
    } catch(e){
      setAlertTitle('Hata')
      setAlertMessage('Bir hata oluştu')
      setShowAlert(true)
    }
  }

  return (
    <SafeAreaView>
      <Alert title={alertTitle} message={alertMessage} visible={showAlert} onClose={()=>setShowAlert(false)} />
      <View
        style={{
          width: width * 0.85,
          marginHorizontal: 'auto',
          marginTop: height * 0.05,
        }}>
        <View style={styles.notifyContainer}>
          <Text style={[fonts.medium, {fontSize: 16, color: '#000'}]}>
            Mail Bildirimleri
          </Text>
          <SwitchComp value={email} onChange={() => setEmail(!email)} />
        </View>
        <View style={styles.notifyContainer}>
          <Text style={[fonts.medium, {fontSize: 16, color: '#000'}]}>
            Telefon Bildirimleri
          </Text>
          <SwitchComp value={phone} onChange={() => setPhone(!phone)} />
        </View>
        <View style={styles.notifyContainer}>
          <Text style={[fonts.medium, {fontSize: 16, color: '#000'}]}>
            SMS Bildirimleri
          </Text>
          <SwitchComp value={sms} onChange={() => setSms(!sms)} />
        </View>
      </View>
      <Pressable onPress={updatePermissions}>
        <View
          style={{
            width: width * 0.85,
            marginHorizontal: 'auto',
            marginTop: height * 0.02,
            backgroundColor: '#33d100',
            paddingVertical: 10,
            borderRadius: 8,
            alignItems: 'center',
          }}>
          <Text style={[fonts.semibold, {fontSize: 16, color: '#fff'}]}>Kaydet</Text>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default NotificationPage;
const styles = StyleSheet.create({
  notifyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    boxShadow: '0 1 3 .5 #ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 16,
  },
});
