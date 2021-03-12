import React, { useState } from "react";
import { Text, TouchableOpacity, View, Image, TextInput, ImageBackground, StatusBar } from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import MapView from 'react-native-maps';
import images from './../constants/images'

const Map = () => {

  const navigation = useNavigation();
  const [region, setRegion] = useState({
    latitudeDelta: 0.025,
    longitudeDelta: 0.025,
    latitude: 758.36,
    longitude: -125.25
  });
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#000"
      />
      <View style={{ backgroundColor: '#E61A4F', height: 100, position: 'absolute', top: 0, zIndex: 111, width: '100%', borderBottomRightRadius: 60 }}>
        <View style={{ backgroundColor: '#AA163A', width: 50, height: 45, borderRadius: 5, alignItems: 'center', justifyContent: 'center', marginLeft: 20, marginTop: 20 }}>
          <Image
            source={images.drawer_icon}
            resizeMode={'contain'}
            style={{ width: 30, height: 30, tintColor: '#fff', }}
          />
        </View>
      </View>
      <MapView
        style={{
          flex: 1
        }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <TouchableOpacity style={{
        borderRadius: 25,
        height: 50,
        alignSelf: 'center',
        // marginHorizontal: 25,
        width: '80%',
        alignItems: "center",
        justifyContent: "center",
        bottom: 20,
        position: 'absolute',
        zIndex: 111,
        backgroundColor: '#DD2831'
      }} onPress={() => { navigation.navigate('Schedule') }}>
        <Text style={{
          color: "white",
          alignSelf: 'center',
          fontWeight: '700'
        }}>Save Location</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Map;