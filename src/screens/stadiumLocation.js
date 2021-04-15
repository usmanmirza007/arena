import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default class StadiumLocation extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        let fullItem = this.props.route.params.fullItem
        return (
            <View style={{ flex: 1, }}>
                <View style={{width: '100%', height: 50, backgroundColor: '#fff', justifyContent: 'center'}}>
                    <Text style={{marginLeft: 10}}
                        onPress={()=>{
                            this.props.navigation.goBack()
                        }}
                    >Back</Text>
                </View>
                <MapView
                    style={{
                        flex: 1
                    }}
                    initialRegion={{
                        latitude: fullItem.stdLat,
                        longitude: fullItem.stdLng,
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.001,
                    }}
                    showsUserLocation={true}
                    maxZoomLevel={12}
                >

                    <Marker coordinate={{
                        latitude: fullItem.stdLat,
                        longitude: fullItem.stdLng,
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.001,
                    }}
                        pinColor={'red'} />

                </MapView>
            </View>
        )
    }
}