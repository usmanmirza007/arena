import React, { useState } from 'react';
import { StyleSheet, Text, ToastAndroid, StatusBar, View, Image, ActivityIndicator, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import { AuthContext } from './Context';
import { useNavigation } from '@react-navigation/native';
import SpinnerScreen from './../components/SpinnerScreen'
import { ScrollView } from 'react-native-gesture-handler';
import images from '../constants/images';

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation();
  const context = React.useContext(AuthContext);

  function validateNumber(phoneNumber) {
    // const regex = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/
    const regex = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/
    return regex.test(phoneNumber)
  }
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
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
        <Text style={[{ fontWeight: '700' }, styles.heading1]}>Welcome Back!</Text>
        <View style={{ marginHorizontal: 25 }}>
          <Text style={{ color: '#fff', marginBottom: 20, fontSize: 13, alignSelf: 'center' }}>Please enter your account here</Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderWidth: 1,
              borderColor: "#4C4C4C",
              borderRadius: 25,
              flex: 1,
              marginBottom: 20
            }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={images.email}
                resizeMode={'contain'}
                style={{ width: 20, height: 20, tintColor: '#4C4C4C', marginLeft: 15 }}
              />
              <TextInput
                style={{
                  fontSize: 15,
                  marginTop: 0,
                  color: "white",
                  marginLeft: 15,
                  flex: 1,
                }}
                autoCapitalize={'none'}
                placeholder="Email..."
                placeholderTextColor={'#4C4C4C'}
                value={email}
              keyboardType={'email-address'}
                onChangeText={setEmail}
              />
            </View>
          </View>


          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderWidth: 1,
              borderColor: "#4C4C4C",
              borderRadius: 25,
              flex: 1

            }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={images.lock}
                resizeMode={'contain'}
                style={{ width: 20, height: 20, tintColor: '#4C4C4C', marginLeft: 15 }}
              />
              <TextInput
                style={{
                  fontSize: 15,
                  marginTop: 0,
                  color: "white",
                  marginLeft: 15,
                  flex: 1
                }}
                placeholder="Password..."
                placeholderTextColor={'#4C4C4C'}
                value={password}
                secureTextEntry={true}
                onChangeText={setPassword}
              />
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              {/* <TouchableOpacity
                  onPress={() => { }}
                  style={{
                    backgroundColor: '#777A7A',
                    width: 21,
                    height: 21,
                    borderRadius: 21,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10,

                  }}>
                  <Image
                    source={images.cross}
                    resizeMode={'contain'}
                    style={{ width: 9, height: 9, tintColor: '#000' }}
                  />
                </TouchableOpacity> */}
            </View>
          </View>
          <TouchableOpacity onPress={() => { }}>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>
          {!loading ? <TouchableOpacity style={styles.loginBtn} onPress={() => {
              if (!validateEmail(email)) {
                ToastAndroid.show("Invalid Email Address", ToastAndroid.SHORT);
              } else if (password.length < 6) {
                ToastAndroid.show("Invalid password", ToastAndroid.SHORT);
              } else {
                try {
                  setLoading(true)
                  context.loginWithEmailPassword(email.trim(), password, () => {
                    setLoading(false)
                  }, (err) => {
                    ToastAndroid.show("Please sign up first", ToastAndroid.SHORT);
                    setLoading(false)

                  });
                } catch (error) {
                  ToastAndroid.show(error.message, ToastAndroid.SHORT);
                  setLoading(false)
                }
              }
          }}
          >
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
            : <SpinnerScreen />}
          <Text style={{ color: '#fff', marginBottom: 0, fontSize: 13, marginTop: 10, alignSelf: 'center' }}>Or continue with</Text>
          <TouchableOpacity style={{
            borderColor: '#0E1EF1',
            borderWidth: 1,
            borderRadius: 25,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30,
            marginBottom: 10,
          }} onPress={() => { }}>
            <Text style={styles.loginText}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            borderColor: '#EE5E07',
            borderWidth: 1,
            borderRadius: 25,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
            marginBottom: 10,
          }} onPress={() => { }}>
            <Text style={styles.loginText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { navigation.navigate('CreateAccount') }}>
            <Text style={styles.loginText}>Don’t have any account?Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* </ImageBackground> */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#231F20'
  }, heading1: {
    fontSize: 30,
    color: "white",
    marginVertical: 10,
    alignSelf: 'center',
    marginTop: 45
  },

  inputView: {
    backgroundColor: "transparent",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    borderWidth: 1,
    borderColor: "#4C4C4C"
  },
  inputText: {
    height: 50,
    color: "white"
  },
  forgot: {
    color: "white",
    fontSize: 11,
    alignSelf: 'flex-end',
    marginTop: 10
  },
  loginBtn: {
    backgroundColor: "#DD2831",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
    alignSelf: 'center'
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
  },
});
