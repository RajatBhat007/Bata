import React, { useState, useEffect, useRef } from 'react';
import { BackHandler, Alert, StatusBar, StyleSheet, View, Linking } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { WHITE } from './component/color';
import BataImageGif from './component/BataImageGif';
import LoginScreen from './component/LoginScreen';
import DeviceInfo from 'react-native-device-info';
import firestore from '@react-native-firebase/firestore';

const App = () => {
  const isMounted = useRef(true);
  const [showSplash, setShowSplash] = useState(true);
  const [updatedVersion, setUpdatedVersion] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [loadingVersions, setLoadingVersions] = useState(true);

  const installedVersion = DeviceInfo.getVersion();

  const getVersions = async () => {
    try {
      const users = await firestore().collection('versions').get();
      const versionFromFirestore = users.docs[0]._data.version;
      console.log(versionFromFirestore, '......111');
      
      if (isMounted.current) {
        setUpdatedVersion(versionFromFirestore);

        if (versionFromFirestore !== installedVersion) {
          setShowPopup(true);
        } else {
          setShowPopup(false);
        }
      }
    } catch (error) {
      console.error('Error fetching versions:', error);
    } finally {
      if (isMounted.current) {
        setLoadingVersions(false);
      }
    }
  };

  useEffect(() => {
    getVersions();

    // Cleanup function
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (showPopup && !loadingVersions && isMounted.current) {
      Alert.alert(
        'Update Required',
        'New version ' + updatedVersion + ' available',
        [
          {
            text: 'Update',
            onPress: () => {
              Linking.openURL(
                'https://play.google.com/store/apps/details?id=com.tgcbata'
              );
            },
          },
        ]
      );
    }
  }, [showPopup, loadingVersions, updatedVersion]);

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