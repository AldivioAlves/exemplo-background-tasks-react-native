import React, { FC } from 'react';

import {
  Text,
  View,
} from 'react-native';

import styles from '../utils/styles';




const EventItem = ({ taskId, timestamp, isHeadless }) => {

  return (
    <View style={[styles.container, styles.borderBottom, styles.paddingTB10]}>
      <Text style={[styles.text, styles.blue]}>
        [{taskId}]
      </Text>
      <Text style={[styles.text]}>
        {timestamp} {isHeadless ? '[Headless]': ''}
      </Text>
    </View>
  );
}



export default EventItem;
