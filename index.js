import { AppRegistry } from 'react-native';
import BackgroundFetch from 'react-native-background-fetch';
import AsyncStorage from '@react-native-async-storage/async-storage'

import App from './App';
import { name as appName } from './app.json';

const headlessTask = async (event) => {
  if (event.timeout) {
    console.log('[BackgroundFetch] 💀 HeadlessTask TIMEOUT: ', event.taskId);
    BackgroundFetch.finish(event.taskId);
    return;
  }
  console.log('[BackgroundFetch] 💀 HeadlessTask start: ', event.taskId);
  let temp = []
  const logs = await AsyncStorage.getItem('logs')
  let now = new Date()
  let date = now.toLocaleDateString() + ' ' + now.toLocaleTimeString()
  if(logs){
    temp = logs.split(',')
  }
  temp.unshift(date)
  temp = String(temp)
  AsyncStorage.setItem('logs', temp)
  BackgroundFetch.finish(event.taskId);
};
BackgroundFetch.registerHeadlessTask(headlessTask);
AppRegistry.registerComponent(appName, () => App);

