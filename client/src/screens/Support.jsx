import React, { useContext, useState } from 'react';
import { View, StyleSheet, Modal, Text, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { UsersContext } from '../context/UsersContext';

export default function Support({ navigation }) {

  const { currentUser } = useContext(UsersContext);
  const [formSubmitVisable, SetFormSubmitVisable] = useState(false);
  const [subject, SetSubject] = useState("");
  const [details, SetDetails] = useState("")
  const HandleFormSubmit = () => {
    if (InputValidate())
      SetFormSubmitVisable(true)
    //Create a form with useState for every variable and then Sends this form to the server in a certain route then there everything will be verified, and in return we will send a notification that the request has been submited.
  }

  const NavigateToAccount = () => {

    navigation.navigate('Account');
  }

  const InputValidate = () => {
    let valid = true;
    if (subject === "" || details === "") {
      alert("Please choose a subject.");
      valid = false;
    }

    return valid;
  }

  return (
    <View style={styles.container}>
      <View style={styles.informationBox}>
        <View style={styles.nameContainer}>
          <TextInput
            label="First Name"
            mode="outlined"
            style={styles.nameInput}
            value={currentUser.firstName}
          />
          <TextInput
            label="Last Name"
            mode="outlined"
            style={styles.nameInput}
            value={currentUser.lastName}
          />
        </View>
        <TextInput
          label="Email"
          mode="outlined"
          keyboardType="email-address"
          style={styles.textInput}
          value={currentUser.email}
        />
        <TextInput
          label="Subject"
          mode="outlined"
          style={styles.textInput}
          onChange={value => SetSubject(value)}
        />
        <TextInput
          label="Additional Details"
          mode="outlined"
          multiline
          numberOfLines={7}
          style={styles.textInput}
          onChange={value => SetDetails(value)}
        />

        <Button
          mode="contained"
          style={styles.button}
          onPress={HandleFormSubmit}
          labelStyle={{ fontFamily: 'Montserrat_Bold', fontSize: 15 }}
        >
          Submit
        </Button>
      </View>


      <Modal
        animationType="slide"
        transparent={true}
        visible={formSubmitVisable}
        onRequestClose={() => SetFormSubmitVisable(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}> Dear {currentUser.firstName}, </Text>

            <Text style={styles.modalText}>Thank you for reaching out to us.</Text>


            <Text style={styles.modalText}>We are pleased to confirm that we have received your support request. A response will be sent to your email address shortly. From this point forward, all communications regarding this matter will be conducted through email to ensure efficient and secure correspondence.</Text>

            <Text style={styles.modalText}>We appreciate your patience and will get back to you as soon as possible.</Text>

            <Text style={styles.modalText}>Best regards,</Text>

            <Text style={styles.modalText}> The Green Miles Team</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={NavigateToAccount}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20
  },
  logo: 'https://example.com/path/to/your/logo.png',
  logoImage: {
    height: 80,
    width: 130,
    alignSelf: 'center',
  },
  informationBox: {
    paddingTop: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    flex: 1,
  },
  headline: {
    color: 'black',
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: 'bold',
    fontSize: 25,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  nameInput: {
    flex: 1,
    marginRight: 5,
    marginLeft: 5,
    height: 50,
    borderRadius: 5,
    backgroundColor: 'white'
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: 'black',
  },
  textInput: {
    borderRadius: 5,
    marginBottom: 25,
    backgroundColor: 'white'
  },
  button: {
    height: 50,
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: '#1CD995',
  },
  modalContainer: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
    maxHeight: '60%'
  },
  modalText: {
    fontSize: 15,
    marginBottom: 15,
    textAlign: "left",
    color: 'black',
    fontFamily: 'Montserrat_Medium',
  },
  closeButton: {
    backgroundColor: '#38DDA2',
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    elevation: 2,
    width: '100%'
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: 'Montserrat_Bold'
  }
});