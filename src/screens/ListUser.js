import React, { useState } from "react";
import { Text, TouchableOpacity, View, ActivityIndicator, TextInput, ImageBackground, StatusBar } from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import images from '../constants/images'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

class ListUser extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      data: [],
      getData: this.props.route.params.allData,
      stadiumName: this.props.route.params.stadiumName,
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
          try {
            // if (element.child(this.state.stadiumName).key === this.state.stadiumName) {
              let allData = element.child(this.state.stadiumName).val().schedule;
              for (let i = 0; i < allData.length; i++) {
                for (let j = 0; j < this.state.getData.length; j++) {
                  if (allData[i].userId === this.state.user._user.uid) {
    
                  }
                  else {
                    if (allData[i].strtTime === this.state.getData[j].strtTime && allData[i].endTime === this.state.getData[j].endTime
                      && allData[i].stdLat === this.state.getData[j].stdLat && allData[i].stdLng === this.state.getData[j].stdLng
                      && allData[i].day === this.state.getData[j].day && allData[i].status === 'Pending') {
                      mArray.push(allData[i])
                    }
                  }
                }
              }
              this.setState({
                data: mArray,
                loading: false
              }, () => {
                console.log('data', allData)
              })
            // }
          }catch(error) {
          }
        });
      }
      else {
        this.setState({loading: false})
      }
    });
  }

  sendRequest = (item) => {
    const reference = database().ref('ScheduleMatches');
    reference.once('value').then((snapshot) => {
      snapshot.forEach(element => {
        if (element.key === item.userId) {
          let allData = element.child(this.state.stadiumName).val().schedule;
          for (let i=0; i<allData.length; i++) {
            if (item.day === allData[i].day) {
              allData[i].status = 'Requested'
              allData[i].requestedBy = this.state.user._user.displayName
              reference.child(item.userId).child(this.state.stadiumName).update({
                schedule: allData
              }).then(() => {
                this.getData()
              })
            }
          }
        }
      });
    });





    // reference.child(item.userId).child(this.state.stadiumName).update({
    //   status: 'Requested'
    // }).then(()=>{
    //   this.getData()
    // })
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
      <Text style={{color: '#fff', fontSize: 20,alignSelf: 'center', marginTop: 20}}>Send Request</Text>
        {this.state.data.map((item, index) => {
          return (
            <View style={{ marginTop: 15, flexDirection: 'row', borderStyle: 'dotted', borderWidth: 2, borderColor: '#5C5B5C', justifyContent: 'space-between', borderRadius: 15, backgroundColor: '#2C2829', marginHorizontal: 25, padding: 35 }}
              key={item.userId}
            >
              <View>
                <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>{'Name: '+item.userName}</Text>
                <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>{'Stadium Name: '+item.stadiumName}</Text>
                <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>{'Day: '+item.day}</Text>
                <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>{'Start time: '+item.strtTime}</Text>
                <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>{'End time: '+item.endTime}</Text>
              </View>
              <TouchableOpacity onPress={() => {navigation.navigate('AcceptMatch')}} style={{ backgroundColor: '#39E8A7', width: 70, height: 40, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}
                onPress={()=>{
                  this.sendRequest(item)
                }}
              >
                <Text style={{ color: '#fff' }}>Request</Text>
              </TouchableOpacity>
            </View>
          )
        })}
      </ScrollView>}
    </View>
  )
}
}

export default ListUser;