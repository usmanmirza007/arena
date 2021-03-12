import React, { useState } from "react";
import { Text, TouchableOpacity, View, Image, TextInput, ImageBackground, StatusBar } from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import images from '../constants/images'
import CheckBox1 from '@react-native-community/checkbox';
import styles from './../constants/styles';

const Searching = () => {

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: '#151314' }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#000"
      />
          <Text style={styles.heading1}>Katie Bouler</Text>
     
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 10,
          marginLeft: 30
        }}>
        <CheckBox1
          lineWidth={1}
          disabled={false}
          value={toggleCheckBox}
          onValueChange={(newValue) => setToggleCheckBox(newValue)}
          style={{}}
          tintColors={{ true: '#E61A4F' }}
        />
        <Text
          style={{
            color: '000',
            fontSize: 13,
            color: '#fff'
          }}>
          Save Searching
              </Text>
      </View>
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
      }} onPress={() => { }}>
        <Text style={{
          color: "white",
          alignSelf: 'center',
          fontWeight: '700'
        }}>Search For Match</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Searching;