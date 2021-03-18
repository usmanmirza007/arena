import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, Image, TextInput, ImageBackground, StatusBar } from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from './../screens/Context';
import images from '../constants/images';
import styles from './../constants/styles';
import auth from '@react-native-firebase/auth';
import MapView from 'react-native-maps';

const AcceptMatch = () => {
  const user = auth().currentUser
  const navigation = useNavigation();
  const context = React.useContext(AuthContext);

  return (
    <View style={{ flex: 1, backgroundColor: '#231F20' }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#000"
      />
      <ScrollView overScrollMode={'never'} showsVerticalScrollIndicator={false}>
        <View style={{ marginHorizontal: 25 }}>
          <View style={{ backgroundColor: '#282828', marginTop: 40, width: 160, height: 160, borderRadius: 160, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
            <View style={{ backgroundColor: '#231F20', width: 140, height: 140, borderRadius: 140, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
              <View style={{ alignItems: 'center', }}>
                <Image
                  source={images.men}
                  resizeMode={'contain'}
                  style={{ width: 120, height: 120, borderRadius: 120, tintColor: '#4C4C4C', }}
                />
              </View>
            </View>
            <View style={{ marginLeft: 90, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ position: 'absolute', backgroundColor: '#DD2831', width: 40, height: 20, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{}}>Edit</Text>
              </View>
            </View>
          </View>
          <Text style={styles.heading1}>{user?.displayName}</Text>
          <Text style={styles.info}>Age: 34 years</Text>
          <View style={{ marginTop: 15, flexDirection: 'row', borderStyle: 'dotted', borderWidth: 2, borderColor: '#5C5B5C', justifyContent: 'space-between', borderRadius: 15, backgroundColor: '#2C2829', padding: 15 }}>
            <View>
              <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>Date</Text>
              <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>12-12-2021</Text>
            </View>
            <View>
              <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>Time</Text>
              <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>12:36 am</Text>
            </View>
          </View>
          <Text style={{color: '#fff', fontWeight: '700', marginTop: 10}}>Location</Text>
          <MapView
            style={{
              // flex: 1
              marginTop: 20,
              height: 150
            }}
            initialRegion={{
              latitude: 73.1254874,
              longitude: 34.1218764,
              latitudeDelta: 0.001,
              longitudeDelta: 0.001
            }}
            showsUserLocation={true}
          />
          <Text style={{color: '#fff', fontWeight: '700',alignSelf: 'center',fontSize: 30, marginTop: 10}}>Found Match</Text>
              <View style={{ flexDirection: 'row',marginVertical: 20, justifyContent: 'space-between' }}>
          <TouchableOpacity style={{
            borderRadius: 25,
            height: 50,
            alignSelf: 'center',
            paddingHorizontal: 40,
            borderColor: '#fff',
            borderWidth: 0.5,
            alignItems: "center",
            justifyContent: "center",
          }} onPress={() => { }}>
            <Text style={{
              color: "white",
              alignSelf: 'center',
              fontWeight: '700'
            }}>Decline</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            borderRadius: 25,
            height: 50,
            alignSelf: 'center',
            paddingHorizontal: 40,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: '#DD2831'
          }} onPress={() => { }}>
            <Text style={{
              color: "white",
              alignSelf: 'center',
              fontWeight: '700'
            }}>Accept</Text>
          </TouchableOpacity>
        </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default AcceptMatch;