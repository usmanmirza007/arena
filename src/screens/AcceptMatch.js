import React, { useState } from "react";
import { Text, TouchableOpacity, View, ActivityIndicator, TextInput, ImageBackground, StatusBar } from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import images from '../constants/images'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

class AcceptMatch extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            data: [],
            user: auth().currentUser,
            googleUser: null,
            loading: true,
            acceptedRequest: [],
            isTrue: true
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        var mArray = []
        var acceptedArray = []
        const ref = database().ref('ScheduleMatches');
        ref.once('value').then((snapshot) => {
            snapshot.forEach(element => {
                if (element.key === this.state.user._user.uid) {

                } else {
                    element.forEach(e => {
                        e.val().schedule.forEach(item => {
                            if (item.status === 'Requested') {
                                mArray.push(item)
                            } else if (item.status === 'Accept') {
                                acceptedArray.push(item)
                            }
                        })
                    })
                    this.setState({
                        data: mArray,
                        acceptedRequest: acceptedArray,
                        loading: false
                    }, () => {
                        // console.log('data', this.state.data)
                    })
                }
            });
        });

    }

    sendRequest = (item, status) => {
        const reference = database().ref('ScheduleMatches');
        reference.once('value').then((snapshot) => {
            snapshot.forEach(element => {
                if (element.key === item.userId) {
                    let allData = element.child(item.stadiumName).val().schedule;
                    for (let i = 0; i < allData.length; i++) {
                        if (item.day === allData[i].day) {
                            allData[i].status = status
                            allData[i].requestedBy = this.state.user._user.displayName
                            reference.child(item.userId).child(item.stadiumName).update({
                                schedule: allData
                            }).then(() => {
                                this.getData()
                                if (status == 'Accept') {
                                    this.props.navigation.navigate('stadiumLocation', {
                                        fullItem: item
                                    })
                                }
                            })
                        }
                    }
                }
            });
        });
    }

    requests = () => {
        return <View>
            {this.state.data.map((item, index) => {
                return (
                    <View style={{ marginTop: 15, flexDirection: 'row', borderStyle: 'dotted', borderWidth: 2, borderColor: '#5C5B5C', justifyContent: 'space-between', borderRadius: 15, backgroundColor: '#2C2829', marginHorizontal: 25, padding: 35 }}>
                        <View>
                            <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>Requested by:{+ item.requestedBy.toLowerCase() === this.state.user._user.displayName.toLowerCase() ? 'You' : item.requestedBy}</Text>
                            <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>{'Stadium Name: ' + item.stadiumName}</Text>
                            <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>{'Day: ' + item.day}</Text>
                            <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>{'Start time: ' + item.strtTime}</Text>
                            <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>{'End time: ' + item.endTime}</Text>
                        </View>

                        <View>
                            <TouchableOpacity style={{ backgroundColor: '#39E8A7', width: 70, height: 40, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => {
                                    this.sendRequest(item, 'Accept')
                                }}
                            >
                                <Text style={{ color: '#fff' }}>Accept</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ backgroundColor: 'red', width: 70, height: 40, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
                                onPress={() => {
                                    this.sendRequest(item, 'Reject')
                                }}
                            >
                                <Text style={{ color: '#fff' }}>Decline</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                )
            })}
        </View>

    }

    acceptes = () => {
        return <View>
            {this.state.acceptedRequest.map((item, index) => {
                return (
                    <View style={{ marginTop: 15, flexDirection: 'row', borderStyle: 'dotted', borderWidth: 2, borderColor: '#5C5B5C', justifyContent: 'space-between', borderRadius: 15, backgroundColor: '#2C2829', marginHorizontal: 25, padding: 35 }}>
                        <View>
                            <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>Accepted by: {+ item.requestedBy.toLowerCase().includes(this.state.user._user.displayName.toLowerCase()) ? 'You' : item.requestedBy}</Text>
                            <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>{'Stadium Name: ' + item.stadiumName}</Text>
                            <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>{'Day: ' + item.day}</Text>
                            <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>{'Start time: ' + item.strtTime}</Text>
                            <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>{'End time: ' + item.endTime}</Text>
                        </View>

                        <View style={{flexDirection: 'column', alignSelf: 'center'}}>
                            <View style={{ backgroundColor: '#39E8A7', width: 70, height: 40, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => {
                                    // this.sendRequest(item, 'Accept')
                                    // alert(this.state.user._user.displayName)
                                }}
                            >
                                <Text style={{ color: '#fff' }}>Accepted</Text>
                            </View>

                            {/* <TouchableOpacity onPress={() => { navigation.navigate('AcceptMatch') }} style={{ backgroundColor: 'red', width: 70, height: 40, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
                                onPress={() => {
                                    this.sendRequest(item, 'Rejected')
                                }}
                            >
                                <Text style={{ color: '#fff' }}>Decline</Text>
                            </TouchableOpacity> */}
                        </View>

                    </View>
                )
            })}
        </View>

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
                        <Text style={{ color: '#fff', fontSize: 20, alignSelf: 'center', marginTop: 20 }}>Requests</Text>

                        <View style={{ height: 80, width: '100%', flexDirection: 'row' }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity style={{ width: 100, height: 40, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => this.setState({ isTrue: true }, () => this.getData())}
                                >
                                    <Text>Requests</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity style={{ width: 100, height: 40, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => this.setState({ isTrue: false }, () => this.getData())}
                                >
                                    <Text>Accepted</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {
                            this.state.isTrue ? this.requests() : this.acceptes()
                        }
                    </ScrollView>}
            </View>
        )
    }
}

export default AcceptMatch;