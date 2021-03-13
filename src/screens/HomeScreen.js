import React, {useEffect, useState} from "react";
import { Text, TouchableOpacity, View, Image, TextInput, ImageBackground, StatusBar } from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from './../screens/Context';
import images from '../constants/images';
import styles from './../constants/styles';

const HomeScreen = () => {

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
          <TouchableOpacity onPress={() => { context.signOut() }}>
            <Image
              source={images.logout}
              resizeMode={'contain'}
              style={{ width: 30, height: 30, marginTop: 20, tintColor: '#fff', }}
            />
          </TouchableOpacity>
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
          <Text style={styles.heading1}>Katie Bouler</Text>
          <Text style={styles.info}>Tell us about yourself?</Text>
          <View style={{ marginTop: 100 }}>
            <TouchableOpacity style={[styles.loginBtn, { backgroundColor: '#DD2831' }]} onPress={() => { navigation.navigate('Map')  }}>
              <Text style={styles.loginText}>Find Match</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
              borderColor: '#fff',
              borderWidth: 1,
              borderRadius: 25,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
              marginBottom: 10,
            }} onPress={() => {}}>
              <Text style={styles.loginText}>Match History</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default HomeScreen;