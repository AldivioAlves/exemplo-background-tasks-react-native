import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ScrollView,
  View,
  Text
} from 'react-native';
import BackgroundFetch from 'react-native-background-fetch';

const App = () => {
  const [logs, setLogs] = useState([])
  
  const loadLogs = async()=>{
    const logs = await AsyncStorage.getItem('logs')
    if(logs){
      setLogs(logs.split(','))
    }
  }
  const init = async () => {
     await BackgroundFetch.configure({
      minimumFetchInterval: 15,      
      forceAlarmManager: false,     
      stopOnTerminate: false,
      enableHeadless: true,
      startOnBoot: true,
      requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE, 
      requiresCharging: false,       
      requiresDeviceIdle: false,     
      requiresBatteryNotLow: false,  
      requiresStorageNotLow: false,  
    }, async (taskId) => {
      console.log("no init taskId", taskId)

      BackgroundFetch.finish(taskId);

    }, (err) => {
      console.log("err no init=>>> ", err)
    });
    await BackgroundFetch.start()
    loadLogs()
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        padding: 10
      }}
    >
      <ScrollView>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            textAlign: 'center'
          }}
        >
          Logs
          </Text>

        {
          logs.length > 0 && 
            logs.map((log, index) => (
              <Text
              key = {index}
              >
                {log}
              </Text>
            ))
        }
      </ScrollView>
    </View>
  )
}

export default App
