import React, { useState, useEffect } from 'react';
import {
  BackHandler,
  Alert,
  StatusBar,
  StyleSheet,
  View,
  Linking,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { WHITE } from './component/color';
import BataImageGif from './component/BataImageGif';
import LoginScreen from './component/LoginScreen';
import DeviceInfo from 'react-native-device-info';
import firestore from '@react-native-firebase/firestore';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [updatedVersion, setUpdatedVersion] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  console.log(showPopup,"...aa")

  const installedVersion = DeviceInfo.getVersion();

  const getVersions = async () => {
    if (!popupShown) { // Check if the pop-up has already been shown
      const users = await firestore().collection('versions').get();
      if (users.docs.length > 0) {
        const versionFromFirestore = users.docs[0]._data.version;
        console.log(versionFromFirestore, '......111');
        if (versionFromFirestore && versionFromFirestore !== installedVersion) {
          setUpdatedVersion(versionFromFirestore);
          setShowPopup(true); // Set the condition to true to show the popup
          setPopupShown(true); // Set the flag to indicate that the pop-up has been shown
        } else {
          setShowPopup(false); // Set the condition to false to hide the popup
        }
      } else {
        setShowPopup(false); // No data found, so hide the popup
      }
    }
  };
  useEffect(() => {
    getVersions();
  }, []);

  useEffect(() => {
    if (showPopup) {
      Alert.alert(
        'Update Required',
        'New version ' + updatedVersion + ' available',
        [
          {
            text: 'Update',
            onPress: () => {
              // Open the respective app store for the update
              if (Platform.OS === 'android') {
                Linking.openURL(
                  'https://play.google.com/store/apps/details?id=com.tgcbata'
                );
              } else {
                Linking.openURL('https://appstoreconnect.apple.com/apps/6463896673/appstore/ios/version/inflight');
              }
            },
          },
        ]
      );
    }
  }, [showPopup]);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 1650);
  }, []);

  return (
    <>
      {showSplash ? (
        <BataImageGif />
      ) : (
        <SafeAreaProvider>
          <StatusBar backgroundColor={WHITE} barStyle="dark-content" />
          <View style={styles.container}>
            <LoginScreen />
          </View>
        </SafeAreaProvider>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});

export default App;