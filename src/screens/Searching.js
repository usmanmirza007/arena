import React, { useState } from "react";
import { Text, TouchableOpacity, View, Image, TextInput, ImageBackground, StatusBar } from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import images from '../constants/images'
import styles from './../constants/styles';
import Ican from 'react-native-vector-icons/AntDesign';
import SpinnerScreen from './../components/SpinnerScreen'

const Searching = () => {

  const navigation = useNavigation();
  const [loading, setLoading] = useState(true)

  searchByLatLng = () => {
    const reference = database().ref('ScheduleMatches');

  }

  return (
    <View style={{ flex: 1, backgroundColor: '#151314' }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#000"
      />
      <Text style={{
        fontSize: 20,
        color: "white",
        marginVertical: 10,
        alignSelf: 'center',
        marginTop: 60
      }}>Searching For Tennis Match</Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
        }}>
        <Image source={images.location} style={{ width: 20, height: 20, marginRight: 10 }} resizeMode={'contain'} />
        <Text
          style={{
            color: '000',
            fontSize: 13,
            color: '#fff'
          }}>
          Albuquerque
              </Text>
      </View>
      {loading? <SpinnerScreen/> : null}
      <View style={{ marginBottom: 40, flexGrow: 1, justifyContent: 'flex-end' }}>

        <View style={{ flexDirection: 'row', marginHorizontal: 25, justifyContent: 'space-between' }}>
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
            }}>Cancel</Text>
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
            }}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Searching;