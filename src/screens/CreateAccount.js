import React, { useState } from 'react';
import { Text, View, TextInput, ImageBackground, StatusBar, Switch, ActivityIndicator, TouchableOpacity, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import images from './../constants/images';
import { AuthContext } from './Context';
import styles from './../constants/styles';
import SpinnerScreen from './../components/SpinnerScreen'
import { ScrollView } from 'react-native-gesture-handler';
import CheckBox1 from '@react-native-community/checkbox';
import Picker from '@react-native-picker/picker'

export default function CreateAccount() {

  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [experience, setExperience] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false)
  const [timeSwitch, setTimeSwitch] = useState(null);
  const [selectedSite, setSelectedSite] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const context = React.useContext(AuthContext);
  const navigation = useNavigation();
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  function validatePhone(phone) {
    const regex = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/
    return regex.test(phone);
  }

  function validatePassword(password) {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    var pass = regex.test(password)
    return pass
  }

  const initialState = () => {
    setFullName('')
    setPhoneNumber('')
    setEmailAddress('')
    setPassword1('')
    setPassword2('')
  }

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="#000"
      />
      {/* <ImageBackground source={images.backgroundImage} style={styles.image}> */}
        <ScrollView>
          <View style={{ marginHorizontal: 25 }}>
            <Text style={styles.heading1}>Create Account</Text>
            <Text style={styles.info}>Please enter your account here</Text>
            <Text style={styles.info}>Tell us about yourself?</Text>
            <View style={styles.inputView} >
              <TextInput
                style={styles.inputText}
                placeholder="Full name"
                placeholderTextColor="#4C4C4C"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>
            <View style={styles.inputView} >
              <TextInput
                style={styles.inputText}
                placeholder="Email..."
                placeholderTextColor="#4C4C4C"
                keyboardType={'email-address'}
                value={emailAddress}
                onChangeText={setEmailAddress}
              />
            </View>
            <View style={styles.inputView} >
              <TextInput
                secureTextEntry
                style={styles.inputText}
                placeholder="Password..."
                placeholderTextColor="#4C4C4C"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />
            </View>
            <View style={styles.inputView} >
              <TextInput
                style={styles.inputText}
                placeholder="Age..."
                placeholderTextColor="#4C4C4C"
                value={age}
                onChangeText={setAge}
              />
            </View>
            <View style={styles.inputView} >
              <TextInput
                secureTextEntry
                style={styles.inputText}
                placeholder="Experience..."
                placeholderTextColor="#4C4C4C"
                value={experience}
                onChangeText={setExperience}
              />
            </View>
            <View style={styles.inputView} >
              <TextInput
                secureTextEntry
                style={styles.inputText}
                placeholder="Location..."
                placeholderTextColor="#4C4C4C"
                value={location}
                onChangeText={setLocation}
              />
            </View>
            {/* <View style={{ borderWidth: 1, borderColor: '#000', borderRadius: 5, marginTop: 10 }}>
              <Picker
                selectedValue={selectedSite}
                style={{ marginLeft: 10, }}
                itemStyle={{ fontFamily: 'Montserrat-Regular', fontSize: 15 }}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedSite(itemValue)
                }}>
                <Picker.Item label={'Select'} value={''} />
                <Picker.Item label={'Low'} value={'low'} />
                <Picker.Item label={'Medium'} value={'medium'} />
                <Picker.Item label={'High'} value={'high'} />
              </Picker>

            </View> */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <CheckBox1
                lineWidth={1}
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                style={{}}
                tintColors={{ true: 'red' }}
              />
              <Text
                style={{
                  color: '000',
                  fontSize: 13,
                  color: '#fff'
                }}>
                Yes continue to main screen
              </Text>
            </View>
            {!loading ? <TouchableOpacity style={styles.loginBtn} onPress={() => {
              navigation.navigate('HomeScreen')
              // if (phoneNumber && emailAddress && password1 && password2) {
              //   if (!validatePassword(password1)) {
              //     ToastAndroid.show("Password needs to contain alphabets, numbers and $, % with at least 8 characters", ToastAndroid.SHORT);
              //   } else if (password1 != password2) {
              //     ToastAndroid.show("Confirm password do not match!", ToastAndroid.SHORT);
              //   } else if (!validateEmail(emailAddress)) {
              //     ToastAndroid.show("Invalid email address!", ToastAndroid.SHORT);
              //   } else if (!validatePhone(phoneNumber)) {
              //     ToastAndroid.show("Invalid phone number!", ToastAndroid.SHORT);
              //   } else {
              //     console.log("Sending OTP");
              //     ToastAndroid.show("Sending OTP", ToastAndroid.SHORT);
              //     try {
              //       setLoading(true)
              //       context.sendOtp(phoneNumber, () => {
              //         navigation.navigate('Verification', { number: phoneNumber, email: emailAddress, password: password1, fullName: fullName, signUp: true })
              //         setLoading(false)
              //         initialState()
              //       });
              //     } catch (error) {
              //       ToastAndroid.show(error.message, ToastAndroid.SHORT);
              //       setLoading(false)
              //     }
              //   }
              // } else {
              //   ToastAndroid.show("Please fill all fields!", ToastAndroid.SHORT);
              // }
            }}>
              <Text style={styles.loginText}>Create Account</Text>
            </TouchableOpacity>
              :
              <SpinnerScreen />}
            <TouchableOpacity onPress={() => navigation.push("Login")}>
              <Text style={[{ marginBottom: 20 }, styles.loginText]}>Already have an account? Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      {/* </ImageBackground> */}

    </View>
  );
}
