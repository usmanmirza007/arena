import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import colors from '../constants/colors';
import images from '../constants/images';

const TimePicker = ({updateTime, editTime}) => {

  const [time, setTime] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentTime = selectedDate || time;
    setShow(Platform.OS === 'ios');
    setTime(currentTime);
    updateTime(currentTime);
    
  };

  const showModeTime = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showTimePicker = () => {
    showModeTime('time');
  };

  return (
    <View>
      <View
        style={{
          flex: 1,
          // marginBottom: 13,
        }}>
          <TouchableOpacity
            style={{
              width: 100,
              height: 41,
              alignItems: 'center',
            }}
            onPress={showTimePicker}>
            <Text
              style={{
                fontSize: 15,
                marginLeft: 20,
                color: '#fff'
              }}>
              {editTime ? moment(editTime, 'h:mm a').format('h:mm a') : moment(time).format('h:mm a')}
            </Text>
          </TouchableOpacity>
      </View>
      
       {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={time}
          mode={mode}
          is24Hour={false}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};
export default TimePicker;
