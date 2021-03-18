import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, ImageBackground, StatusBar, Switch, ActivityIndicator, TouchableOpacity, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import RNLocation from "react-native-location";

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
  const [currentRegion, setCurrentRegion] = useState(null)
  const [grantPermission, setGrantPermission] = useState(false);
  const [customerLocationAddress, setCustomerLocationAddress] = useState(null)
  const context = React.useContext(AuthContext);
  const navigation = useNavigation();
  
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }


  useEffect(() => {
    RNLocation.configure({
      distanceFilter: 5.0
    });

    RNLocation.requestPermission({
      ios: "whenInUse",
      android: {
        detail: "fine",

      }
    }).then(granted => {
      if (granted) {
        setGrantPermission(true);
        Geolocation.getCurrentPosition(
          (position) => {
            const region = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.001,
              longitudeDelta: 0.001
            };
            setCurrentRegion(region)
            // dispatch(Actions.customerLocation(region))

            fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + region.latitude + "," + region.longitude + "&key=" + "AIzaSyAQxad83rtXclRkU8xQNJA-M46_sP6sW64")
              .then((response) => response.json())
              .then((responseJson) => {
                console.log('res',responseJson);
                const userLocation = responseJson.results[0].formatted_address;
                setLocation(userLocation)
                // dispatch(Actions.customerLocationAddress(userLocation));
              });
          },
          (error) => {
            console.log("Error", error);
          },
          { enableHighAccuracy: false, timeout: 20000 },
        );
      }
    });
    console.log('location', currentRegion);
  }, []);

  const initialState = () => {
    setFullName('')
    setEmailAddress('')
    setPassword('')
    setAge('')
    setExperience('')
    setLocation('')
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
              autoCapitalize={'none'}
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
              keyboardType={'number-pad'}
              onChangeText={setAge}
            />
          </View>
          <View style={styles.inputView} >
            <TextInput
              style={styles.inputText}
              placeholder="Experience..."
              placeholderTextColor="#4C4C4C"
              value={experience}
              onChangeText={setExperience}
            />
          </View>
          <View style={styles.inputView} >
            <TextInput
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
              <Picker.Item label='Select' value='' />
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
            if (fullName && age && experience && location && emailAddress && password) {
              if (password.length < 6) {
                ToastAndroid.show("Password needs to contain alphabets, numbers and $, % with at least 8 characters", ToastAndroid.SHORT);
              } else if (!validateEmail(emailAddress)) {
                ToastAndroid.show("Invalid email address!", ToastAndroid.SHORT);
              } else {
                console.log("Sending OTP");
                try {
                  setLoading(true)
                  context.createUser(emailAddress.trim(), password, () => {
                    context.setEmailPassword(emailAddress, password);
                    context.setProfileInfo(fullName);
                    setLoading(false)
                    initialState()
                  });
                } catch (error) {
                  ToastAndroid.show(error.message, ToastAndroid.SHORT);
                  setLoading(false)
                }
              }
            } else {
              ToastAndroid.show("Please fill all fields!", ToastAndroid.SHORT);
            }
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
