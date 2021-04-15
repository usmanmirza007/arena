import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Modal, Text, TouchableOpacity, Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const UserModal = forwardRef((props, ref) => {

  const [modalShow, setModalShow] = useState(false);
  const navigation = useNavigation();

  useImperativeHandle(ref, () => ({
    getAlert() {
      setModalShow(true);
    },
  }));

  return (
    <Modal animationType="fade" transparent={true} visible={modalShow}>
      <View
        style={{
          flex: 1,
          // justifyContent: 'center',
          height: '100%',
          width: '100%',
        }}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            width: '100%',
            height: '100%',
            zIndex: 5,
            backgroundColor: '#272C3F',
            opacity: 0.5,
          }}
          onPress={() => setModalShow(false)}>
          <View style={{}}></View>
        </TouchableOpacity>

        <View
          style={{
            left: 30,
            justifyContent: 'center',
            height: 250,
            position: 'absolute',
            zIndex: 10,
          }}>

          <View
            style={[{
              paddingHorizontal: 18,
              borderRadius: 5,
              backgroundColor: '#fff',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 7 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 3,
            },]}>
            <View style={{ marginVertical: 10, }}>
            <TouchableOpacity onPress={() => {
                navigation.navigate('AcceptMatch')
                setModalShow(false)
              }} style={{ marginVertical: 3 }}>
                <Text style={{ marginTop: 5, fontSize: 15 }}>My Request</Text>
              </TouchableOpacity>
              <View style={{ borderBottomColor: '#e9e9e9', borderBottomWidth: 2, marginHorizontal: -18, marginTop: 10 }} />
              <TouchableOpacity onPress={() => {
                navigation.navigate('MyRequest')
                setModalShow(false)
              }}>
                <Text style={{ marginTop: 5, fontSize: 15 }}>Match Location</Text>
              </TouchableOpacity>
              <View style={{ borderBottomColor: '#e9e9e9', borderBottomWidth: 2, marginHorizontal: -18, marginTop: 10 }} />
            </View>

            <TouchableOpacity style={{ width: '100%', alignSelf: 'center', paddingBottom: 20, alignItems: 'center' }} onPress={() => setModalShow(false)}>
              <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 14 }}>
                CLOSE
                </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
});

export default UserModal;
