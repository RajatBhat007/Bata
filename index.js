/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import { firebase } from '@react-native-firebase/app'


const firebaseConfig = {
    apiKey: "AIzaSyAS31xrMxNGV3eMs4m4QMV56_vvKqStqlQ",
    authDomain: "177415152904",
    projectId: "bata-e7c32",
    databaseURL:"https://bata-e7c32-default-rtdb.firebaseio.com/",
    storageBucket: "bata-e7c32.appspot.com",
    messagingSenderId: "177415152904",
    appId: "bata-e7c32"
  };
  
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
AppRegistry.registerComponent(appName, () => App);
