import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { color, fonts } from '../../utils/constants';


type AlertProps = {
    visible: boolean;
    title: string;
    message: string;
    onClose: () => void;
};



const Alert:React.FC<AlertProps> = ({ visible, title, message, onClose }) => {
    
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
    >
      <View style={styles.modalOverlay}>
        <View style={styles.alertBox}>
          <Text style={[fonts.bold,styles.title]}>{title}</Text>
          <Text style={[fonts.medium,styles.message]}>{message}</Text>
          <TouchableOpacity onPress={onClose} style={styles.button}>
            <Text style={[fonts.medium,styles.buttonText]}>{title ==="Kayıt Başarılı" ? "Giriş Yap" : "Tamam" }</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const {width,height}=Dimensions.get('window')


const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff99',
    },
    alertBox: {
      width: width*.8,
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
    },
    title: {
      fontSize: 20,
      marginBottom: 10,
    },
    message: {
      fontSize: 16,
      marginBottom: 20,
    },
    button: {
      alignSelf: 'flex-end',
      paddingVertical: 8,
      paddingHorizontal: 24,
      backgroundColor: color.primary,
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
  });
  export default Alert;