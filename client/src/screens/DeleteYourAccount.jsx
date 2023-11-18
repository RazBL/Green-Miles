import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Button, Headline, useTheme } from 'react-native-paper';
import { UsersContext } from '../context/UsersContext';

export default function DeleteAccount({navigation}) {
  const theme = useTheme();
  const { DeleteUserAccount } = useContext(UsersContext);
  const [showMessage, SetShowMessage] = useState(false);
  const DeleteAccount = async () => {
    await DeleteUserAccount();

    alert('Account was deleted successfully');
    navigation.navigate('Login')
  }

  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).textContainer}>
        <Text style={styles(theme).text}>
          Are you sure you want to delete your Green Miles account? If you are having problems, please contact our support who can help.
        </Text>

        <Text style={styles(theme).text}>
          Deleting your account will remove access to Green Miles order history, personal information, and more.
        </Text>
      </View>

      <Button
        mode="contained"
        style={styles(theme).button}
        labelStyle={{ fontFamily: 'Montserrat_Bold', color: 'black', fontSize: 15 }}
        onPress={() => SetShowMessage(true)}
      >
        Delete account
      </Button>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showMessage}
        onRequestClose={() => SetShowMessage(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles(theme).modalContainer}>
            <Text style={{ fontFamily: 'Montserrat_Bold', fontSize: 16, textAlign: 'center' }}>
              Confirmation
            </Text>
            <Text style={styles(theme).modalText}>
              Deleting your account will remove access to Green Miles order history, personal information, and more.
              Are you sure you want to delete your account?
            </Text>

            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={styles(theme).deleteAccountButton}
                onPress={DeleteAccount}
              >
                <Text style={styles(theme).deleteButtonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles(theme).closeButton}
                onPress={() => SetShowMessage(false)}
              >
                <Text style={styles(theme).closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = theme => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  textContainer: {
    marginBottom: 20,
  },
  text: {
    marginBottom: 10,
    fontFamily: 'Montserrat_Bold', // גופן Montserrat_Bold
  },
  button: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 0.8,
    marginBottom: 25,
    borderRadius: 25,
    borderColor: 'black'
  },
  modalContainer: {
    width: 350,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalText: {
    fontFamily: 'Montserrat_Medium',
    fontSize: 15,
    textAlign: 'center',
    marginVertical: 20,
  },
  closeButton: {
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'black',
    width: '45%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginLeft: 10
  },
  deleteAccountButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    width: '45%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginRight: 10
  },
  closeButtonText: {
    fontFamily: 'Montserrat_Bold',
    color: 'white',
    fontSize: 15
  },
  deleteButtonText: {
    fontFamily: 'Montserrat_Bold',
    color: 'black',
    fontSize: 15
  }
});
