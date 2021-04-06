import React, { useState, FC, useEffect } from 'react';

import {
  Text,
  View,
  Button,
} from 'react-native';
import BackgroundFetch, { BackgroundFetchStatus } from 'react-native-background-fetch';

import { styles, statusToString } from '../utils';



const Footer = ({ onClear, defaultStatus = 'unknown' }) => {
  const [currentStatus, setStatus] = useState(defaultStatus);

  const getStatus = async () => {
    const status = await BackgroundFetch.status();
    status && setStatus(statusToString(status));
  };

  useEffect(() => {
    getStatus();
  }, [])

  return (
    <View style={[styles.padding10, styles.row, styles.footer]}>
      <Button onPress={getStatus} title='Status' />

      <View style={[styles.wide, styles.row, styles.center, styles.textCenter]}>
        <Text style={[styles.text, styles.bold]}>Status: </Text>
        <Text style={[styles.text]}>{currentStatus}</Text>
      </View>

      <Button onPress={onClear} title='Clear' />
    </View>
  );
};

export default Footer;
