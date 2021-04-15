import React, { Component } from "react";
import { Text, TouchableOpacity, View, Image, StyleSheet, ImageBackground, StatusBar } from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import images from '../constants/images'
import CheckBox1 from '@react-native-community/checkbox';
import TimePicker from './../components/TimePicker';
import moment from 'moment';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import DateTimePicker from '@react-native-community/datetimepicker';

class Schedule extends Component {

  constructor(props) {
    super(props)
    this.state = {
      toggleCheckBox: false,
      time: new Date(),
      days: [
        { day: 'Monday', strtTime: moment(new Date()).format('hh:mm A'), endTime: moment(new Date()).format('hh:mm A') },
        { day: 'Tuesday', strtTime: moment(new Date()).format('hh:mm A'), endTime: moment(new Date()).format('hh:mm A') },
        { day: 'Wednesday', strtTime: moment(new Date()).format('hh:mm A'), endTime: moment(new Date()).format('hh:mm A') },
        { day: 'Thursday', strtTime: moment(new Date()).format('hh:mm A'), endTime: moment(new Date()).format('hh:mm A') },
        { day: 'Friday', strtTime: moment(new Date()).format('hh:mm A'), endTime: moment(new Date()).format('hh:mm A') },
        { day: 'Saturday', strtTime: moment(new Date()).format('hh:mm A'), endTime: moment(new Date()).format('hh:mm A') },
        { day: 'Sunday', strtTime: moment(new Date()).format('hh:mm A'), endTime: moment(new Date()).format('hh:mm A') },
      ],
      user: auth().currentUser,
      googleUser: null,
      fullItem: this.props.route.params != undefined ? this.props.route.params.fullItem : '',
      timePeriod: '',
      showPicker: false,
      itemIndex: 0,
      isData: false
    }
  }

  componentDidMount() {
    this.getCurrentUser()
    this.getSchedule()
  }



  getCurrentUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    this.setState({
      googleUser: currentUser
    })
  };

  getSchedule = () => {
    const ref = database().ref('ScheduleMatches');
    ref.child(this.state.user._user.uid).child(this.state.fullItem.stadiumName).once('value').then((snapshot) => {
      if (snapshot.val() != null) {
        let data = snapshot.val()
        this.setState({
          days: data.schedule,
          isData: true
        },()=>{
          // console.log("ALL:  ", this.state.days)
        })
      }
    })
  }

  postSchedule = () => {
    for (let i = 0; i < this.state.days.length; i++) {
      this.state.days[i] = {
        ...this.state.days[i], ...{
          userId: this.state.user._user.uid,
          userName: this.state.user._user.displayName,
          stadiumName: this.state.fullItem.stadiumName,
          stdLat: this.state.fullItem.latitude,
          stdLng: this.state.fullItem.longitude,
          status: this.state.isData ? this.state.days[i].status : 'Pending',
          requestedBy: this.state.user._user.displayName
        }
      }
    }
    this.setState({
      days: this.state.days
    }, () => {
      const reference = database().ref('ScheduleMatches');
      reference.child(this.state.user._user.uid).child(this.state.fullItem.stadiumName).set({
        schedule: this.state.days,
      }).then(() => {
        this.getSchedule()
        alert('Data saved successfully')
      })
    })
  }

  onChange = (event, selectedDate) => {
    var time
    const currentTime = selectedDate || time;
    this.setState({
      time: currentTime,
      showPicker: false
    }, () => {
      this.selectTime(this.state.time)
    })
  };

  selectTime = (time) => {
    var mArray = [...this.state.days]
    if (this.state.timePeriod === 'start') {
      mArray[this.state.itemIndex].strtTime = moment(time).format('hh:mm A')
      this.setState({ days: mArray })
    } else {
      mArray[this.state.itemIndex].endTime = moment(time).format('hh:mm A')
      this.setState({ days: mArray })
    }
  }

  render() {
    let { toggleCheckBox, time, days, isData } = this.state

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
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>START TIMES</Text>
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>END TIMES</Text>

        </View>
        {
          days.map((item, index) => {
            return (
              <View style={Styles.dayTime} key={item.day}>
                <Text style={Styles.dayTitle}>{item.day}</Text>
                <Text style={{
                  fontSize: 15,
                  marginLeft: 20,
                  color: '#fff'
                }}
                  onPress={() => {
                    this.setState({
                      showPicker: true,
                      itemIndex: index,
                      timePeriod: 'start'
                    })
                  }}
                >{item.strtTime}</Text>
                <Text style={{
                  fontSize: 15,
                  marginLeft: 20,
                  color: '#fff'
                }}
                  onPress={() => {
                    this.setState({
                      showPicker: true,
                      itemIndex: index,
                      timePeriod: 'end'
                    })
                  }}
                >{item.endTime}</Text>
              </View>
            )
          })
        }

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
            // value={toggleCheckBox}
            onValueChange={(newValue) => this.setState({}, () => this.postSchedule())}
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
        {!isData ? null :
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
          }} onPress={() => this.props.navigation.navigate('ListUser',{
              allData: this.state.days,
              stadiumName: this.state.fullItem.stadiumName,
            })}>
            <Text style={{
              color: "white",
              alignSelf: 'center',
              fontWeight: '700'
            }}>Search For Match</Text>
          </TouchableOpacity>}

        {
          this.state.showPicker &&
          <DateTimePicker
            testID="dateTimePicker"
            value={this.state.time}
            mode='time'
            is24Hour={false}
            display="default"
            onChange={this.onChange}
          />
        }
      </View>
    )
  }
}

const Styles = StyleSheet.create({
  dayTime: {
    marginTop: 15, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 30,
  },
  dayTitle: {
    color: '#fff', fontSize: 15, fontWeight: '600', width: 87
  }
})

export default Schedule;