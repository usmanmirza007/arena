import React, { useState, useEffect, Component } from "react";
import { Text, TouchableOpacity, View, Image, StatusBar, ActivityIndicator } from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import Geolocation from 'react-native-geolocation-service';
import RNLocation from "react-native-location";
import { useNavigation } from '@react-navigation/native';
import MapView from 'react-native-maps';
import images from './../constants/images'
import { Marker } from "react-native-maps";
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


class Map extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentRegion: '',
      grantPermission: false,
      loading: true,
      marker: [{
        latitude: 35.108737220411875,
        longitude: -106.56891682029273,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
        stadiumName: 'A1'
      },
      {
        latitude: 35.179553724322105,
        longitude: -106.7321707995394,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
        stadiumName: 'A2'
      }, {
        latitude: 35.195011024882334,
        longitude: -106.66849897925069,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
        stadiumName: 'A3'
      }, {
        latitude: 35.14989336788342,
        longitude: -106.49343376630148,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
        stadiumName: 'A4'
      }, {
        latitude: 35.175872109583636,
        longitude: -106.58071215298547,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
        stadiumName: 'A6'
      }, {
        latitude: 35.11386034496077,
        longitude: -106.61406866064945,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
        stadiumName: 'A7'
      }, {
        latitude: 35.18398397139959,
        longitude: -106.7309452083244,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
        stadiumName: 'A8'
      }, {
        latitude: 35.06785051122086,
        longitude: -106.63016878140456,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
        stadiumName: 'A9'
      }, {
        latitude: 35.19400591297762,
        longitude: -106.66719235932383,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
        stadiumName: 'A10'
      }, {
        latitude: 35.1399837850149,
        longitude: -106.49074809813195,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
        stadiumName: 'A11'
      }, {
        latitude: 35.15898611351953,
        longitude: -106.69805764250519,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
        stadiumName: 'A12'
      }, {
        latitude: 35.14389671895946,
        longitude: -106.5511276918249,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
        stadiumName: 'A13'
      }],
    }
  }

  componentDidMount() {
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
        this.setState({ grantPermission: true })
        Geolocation.getCurrentPosition(
          (position) => {
            const region = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.001,
              longitudeDelta: 0.001
            };
            this.setState({
              currentRegion: region,
              loading: false
            }, () => {
              // this.getPlayGround()
            })
          },
          (error) => {
            console.log("Error", error);
          },
          { enableHighAccuracy: false, timeout: 20000 },
        );
      }
    });
  }

  // this is for your understanding that how to get location from google api's
  getPlayGround = () => {
    fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + this.state.currentRegion.latitude + ',' + this.state.currentRegion.longitude + '&radius=15000&type=stadium&keyword=cruise&key=AIzaSyAQxad83rtXclRkU8xQNJA-M46_sP6sW64', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log('PlayGround', responseData)
        this.setState({
          marker: responseData.results,
          loading: false
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    let { marker, loading, currentRegion } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#000"
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#E61A4F', height: 100, position: 'absolute', top: 0, zIndex: 111, width: '100%', borderBottomRightRadius: 60 }}>
          <TouchableOpacity style={{ backgroundColor: '#AA163A', width: 50, height: 45, borderRadius: 5, alignItems: 'center', justifyContent: 'center', marginLeft: 20, marginTop: 20 }}
            onPress={()=>{
              this.props.navigation.navigate('MyRequest')
            }}
          >
            <Image
              source={images.drawer_icon}
              resizeMode={'contain'}
              style={{ width: 30, height: 30, tintColor: '#fff', }}
            />
          </TouchableOpacity>

          <TouchableOpacity style={{ backgroundColor: '#AA163A', width: 50, height: 45, borderRadius: 5, alignItems: 'center', justifyContent: 'center', marginRight: 20, marginTop: 20 }}
            onPress={()=>{
              this.props.navigation.navigate('AcceptMatch')
            }}
          >
            <Image
              source={images.drawer_icon}
              resizeMode={'contain'}
              style={{ width: 30, height: 30, tintColor: '#fff', }}
            />
          </TouchableOpacity>
        </View>
        {/* mapview */}
        {loading ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size='large' color='green' />
        </View> :
          <MapView
            style={{
              flex: 1
            }}
            initialRegion={{
              latitude: 35.14389671895946,
              longitude: -106.5576574687,
              latitudeDelta: 0.001,
              longitudeDelta: 0.001,
            }}
            showsUserLocation={true}
            maxZoomLevel={12}
          >
            <Marker coordinate={{
              latitude: 35.14389671895946,
              longitude: -106.5576574687,
              latitudeDelta: 0.001,
              longitudeDelta: 0.001,
            }}
              pinColor={'red'} />

            {marker.map((mrkr, index) => (
              <Marker
                key={index}
                coordinate={{
                  // latitude: mrkr.geometry.location.lat,
                  // longitude: mrkr.geometry.location.lng
                  latitude: mrkr.latitude,
                  longitude: mrkr.longitude
                }}
                title={mrkr.stadiumName}
                pinColor={'green'}

                onPress={() => {
                  this.props.navigation.navigate('Schedule', {
                    fullItem: mrkr
                  })
                }}
              ></Marker>
            ))}


          </MapView>}

        {/* <TouchableOpacity style={{
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
        }} onPress={() => { this.props.navigation.navigate('Schedule') }}>
          <Text style={{
            color: "white",
            alignSelf: 'center',
            fontWeight: '700'
          }}>Save Location</Text>
        </TouchableOpacity>
       */}
      </View>
    )
  }
}

export default Map;