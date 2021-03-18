import React, { useState } from "react";
import { Text, TouchableOpacity, View, Image, TextInput, ImageBackground, StatusBar } from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import images from '../constants/images'
const ListUser = () => {

  const navigation = useNavigation();
  const data = [
    { name: 'user name', time: '12:30 am' },
    { name: 'user', time: '12:30 am' },
    { name: 'user', time: '12:30 am' },
    { name: 'user', time: '12:30 am' },
    { name: 'user', time: '12:30 am' },
    { name: 'user', time: '12:30 am' },
  ]
  return (
    <View style={{ flex: 1, backgroundColor: '#151314' }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#000"
      />
      <ScrollView>
      <Text style={{color: '#fff', fontSize: 20,alignSelf: 'center', marginTop: 20}}>Send Request</Text>
        {data.map((item, index) => {
          return (
            <View style={{ marginTop: 15, flexDirection: 'row', borderStyle: 'dotted', borderWidth: 2, borderColor: '#5C5B5C', justifyContent: 'space-between', borderRadius: 15, backgroundColor: '#2C2829', marginHorizontal: 25, padding: 15 }}>
              <View>
                <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>{item.name}</Text>
                <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>{item.time}</Text>
              </View>
              <TouchableOpacity onPress={() => {navigation.navigate('AcceptMatch')}} style={{ backgroundColor: '#39E8A7', width: 70, height: 40, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#fff' }}>Request</Text>
              </TouchableOpacity>
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

export default ListUser;