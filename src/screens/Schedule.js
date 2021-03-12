import React, { useState } from "react";
import { Text, TouchableOpacity, View, Image, TextInput, ImageBackground, StatusBar } from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import images from '../constants/images'
import CheckBox1 from '@react-native-community/checkbox';

const Schedule = () => {

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: '#151314' }}>
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
      <View style={{ marginTop: 130, flexDirection: 'row', justifyContent: 'space-around' }}>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>DAYS</Text>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>TIMES</Text>
      </View>

      <View style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 65 }}>
        <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>Monday</Text>
        <TouchableOpacity>
          <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>2pm-5pm</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 65 }}>
        <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>TuesDay</Text>
        <TouchableOpacity>
          <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>None</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 65 }}>
        <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>Wednesday</Text>
        <TouchableOpacity>
          <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>3pm-6pm</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 65 }}>
        <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>Thursday</Text>
        <TouchableOpacity>
          <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>None</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 65 }}>
        <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>Friday</Text>
        <TouchableOpacity>
          <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>None</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 65 }}>
        <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>Saturday</Text>
        <TouchableOpacity>
          <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>6pm-8pm</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 65 }}>
        <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>Sunday</Text>
        <TouchableOpacity>
          <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>None</Text>
        </TouchableOpacity>
      </View>
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
          Save Schedule
              </Text>
      </View>
      <TouchableOpacity style={{
        borderRadius: 25,
        height: 50,
        alignSelf: 'center',
        width: '80%',
        alignItems: "center",
        justifyContent: "center",
        bottom: 20,
        position: 'absolute',
        zIndex: 111,
        backgroundColor: '#DD2831'
      }} onPress={() => { navigation.navigate('Searching') }}>
        <Text style={{
          color: "white",
          alignSelf: 'center',
          fontWeight: '700'
        }}>Search For Match</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Schedule;