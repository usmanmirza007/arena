import React, { useState } from "react";
import { Text, TouchableOpacity, View, ActivityIndicator, TextInput, ImageBackground, StatusBar } from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

class MyRequest extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      data: [],
      user: auth().currentUser,
      googleUser: null,
      loading: true
    }
  }

  componentDidMount(){
   this.getData()
  }

  getData = () => {
    var mArray = []
    const ref = database().ref('ScheduleMatches');
    ref.once('value').then((snapshot) => {
      if (JSON.stringify(snapshot) != 'null') {
        snapshot.forEach(element => {
          if (element.key === this.state.user._user.uid) {
         
          } else {
              element.forEach(e => {
                  e.val().schedule.forEach(item => {
                      if (item.status === 'Accept') {
                          mArray.push(item)
                      } 
                  })
              })
              this.setState({
                  data: mArray,
                  loading: false
              }, () => {
                  console.log('data', this.state.data)
              })
          }
      });
      }else{this.setState({loading: false})}
    });

  }

  render() {
  return (
    <View style={{ flex: 1, backgroundColor: '#151314' }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#000"
      />
      {this.state.loading ? <ActivityIndicator size='large' color='#fff' /> :
      <ScrollView>
      <Text style={{color: '#fff', fontSize: 20,alignSelf: 'center', marginTop: 20}}>Match Location</Text>
        {this.state.data.map((item, index) => {
          return (
            <TouchableOpacity style={{ marginTop: 15, flexDirection: 'row', borderStyle: 'dotted', borderWidth: 2, borderColor: '#5C5B5C', justifyContent: 'space-between', borderRadius: 15, backgroundColor: '#2C2829', marginHorizontal: 25, padding: 35 }}
                onPress={()=>{
                    this.props.navigation.navigate('stadiumLocation', {
                        fullItem: item
                    })
                }}
            >
              <View>
                <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>{'Name: '+item.userName}</Text>
                <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>{'Stadium Name: '+item.stadiumName}</Text>
                <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>{'Day: '+item.day}</Text>
                <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>{'Start time: '+item.strtTime}</Text>
                <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>{'End time: '+item.endTime}</Text>
              </View>
            </TouchableOpacity>
          )
        })}
      </ScrollView>}
    </View>
  )
}
}

export default MyRequest;