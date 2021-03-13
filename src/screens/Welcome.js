import React from 'react';
import { Text, View, Image, StatusBar, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import images from './../constants/images';
import styles from './../constants/styles';

export default function Welcome() {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="#000"
      />
      <ImageBackground source={images.backgroundImage} style={styles.image}>
        <Image
          style={{
            alignSelf: 'center', width: 200,
            height: 200, marginTop: 40
          }}
          source={images.logo}
        />

        <Text style={styles.heading1}>Create Account</Text>
        <Text style={styles.info}>Join us for fun, fast-paced tinnis clinics for all range of player</Text>
        <View style={{ flexGrow: 1, justifyContent: 'flex-end', marginBottom: 20 }}>
          <TouchableOpacity style={[{ marginHorizontal: 25 }, styles.loginBtn]} onPress={() => navigation.push("CreateAccount")}>
            <Text style={styles.loginText}>Create Account</Text>
          </TouchableOpacity>
          <Text style={styles.or}>Already Member?</Text>
        </View>
      </ImageBackground>

    </View>
  );
}
