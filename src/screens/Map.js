import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, Image, StatusBar } from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import Geolocation from 'react-native-geolocation-service';
import RNLocation from "react-native-location";
import { useNavigation } from '@react-navigation/native';
import MapView from 'react-native-maps';
import images from './../constants/images'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

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
      {/* <View> */}

        {/* <GooglePlacesAutocomplete
          placeholder="Where are you going"
          minLength={2} // minimum length of text to search
          autoFocus={false}
          returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          listViewDisplayed="auto" // true/false/undefined
          fetchDetails={true}
          renderDescription={row => row.description} // custom description render
          onPress={(data, details = null) => {
            // this.props.notifyChange(details.geometry.location)
            console.log("data", data , details);
            console.log("detail", details.geometry.location.lat, details.geometry.location.lng);
            const lat = details.geometry.location.lat
            const log = details.geometry.location.lng
            this.setState({
              latitude: lat,
              longitude: log
            }, () => { this.props.loc(lat, log) })
          }}

          getDefaultValue={() => {
            return ''; // text input default value
          }}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: 'AIzaSyAQxad83rtXclRkU8xQNJA-M46_sP6sW64',
            language: 'en', // language of the results
            types: 'establishment', // default: 'geocode'
            // location: '30.36214, 78.26541',
            radius: '20'
          }}
          styles={{

            description: {
              fontWeight: 'bold',
            },
            // listView: { backgroundColor: '#fff', marginTop: '5%' },
            // container: { flex: 0, position: 'absolute', width: '100%', zIndex: 1, },
            // textInput: {
            //   fontWeight: '700',
            //   fontSize: 18,
            //   marginTop: '5%',
            //   borderRadius: 20,
            //   width: '90%',
            //   marginHorizontal: '5%',
            //   backgroundColor: '#fff',
            //   height: '10%'

            // },
            // predefinedPlacesDescription: {
            //   color: '#1faadb',
            // },
          }}
          currentLocation={true}
          currentLocationLabel="Current location"
          nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={{
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }}
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance',
            types: ['food', 'gym', 'city_hall', 'car_wash'],
          }}
          
          GooglePlacesDetailsQuery={{
            fields: ['formated_address', 'geometry']
          }}
          filterReverseGeocodingByTypes={[
            'locality',
            'administrative_area_level_3',
          ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
          // predefinedPlaces={[homePlace, workPlace]}
          enablePoweredByContainer={false}
          debounce={200}
        /> */}
      {/* </View> */}

      <MapView

        style={{
          flex: 1
        }}
        initialRegion={currentRegion}
        showsUserLocation={true}
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