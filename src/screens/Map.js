import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, Image, StatusBar } from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import Geolocation from 'react-native-geolocation-service';
import RNLocation from "react-native-location";
import { useNavigation } from '@react-navigation/native';
import MapView from 'react-native-maps';
import images from './../constants/images'
import { Marker } from "react-native-maps";
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
const Map = () => {


  const navigation = useNavigation();
  const [currentRegion, setCurrentRegion] = useState(null)
  const [grantPermission, setGrantPermission] = useState(false);

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

            // fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + region.latitude + "," + region.longitude + "&key=" + "AIzaSyCUqXQB1gW0g7FhK_rQom8VkVUCr9X5P-c")
            //   .then((response) => response.json())
            //   .then((responseJson) => {
            //     const userLocation = responseJson.results[0].formatted_address;
            //     // dispatch(Actions.customerLocationAddress(userLocation));
            //   });
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
        initialRegion={currentRegion}
        showsUserLocation={true}
      >
        <Marker coordinate={{
          latitude: 35.108737220411875,
          longitude: -106.56891682029273,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001
        }} pinColor={'red'} />
        <Marker coordinate={{
          latitude: 35.179553724322105,
          longitude: -106.7321707995394,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001
        }} pinColor={'red'} />
        <Marker coordinate={{
          latitude: 35.195011024882334,
          longitude: -106.66849897925069,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001
        }} pinColor={'red'} />
        <Marker coordinate={{
          latitude: 35.14989336788342,
          longitude: -106.49343376630148,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001
        }} pinColor={'red'} />
        <Marker coordinate={{
          latitude: 35.108737220411875,
          longitude: -106.56891682029273,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001
        }} pinColor={'red'} />
        <Marker coordinate={{
          latitude: 35.175872109583636,
          longitude: -106.58071215298547,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001
        }} pinColor={'red'} />
        <Marker coordinate={{
          latitude: 35.11386034496077,
          longitude: -106.61406866064945,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001
        }} pinColor={'red'} />
       
      </MapView>
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