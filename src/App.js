import React, { useState, useEffect, useRef } from 'react';
import { BackHandler, Alert, StatusBar, StyleSheet, View, Linking } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { WHITE } from './component/color';
import BataImageGif from './component/BataImageGif';
import LoginScreen from './component/LoginScreen';
import DeviceInfo from 'react-native-device-info';
import firestore from '@react-native-firebase/firestore';
import WebView from 'react-native-webview';
import { prime_url } from './component/environment';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const isMounted = useRef(true);
  const [showSplash, setShowSplash] = useState(true);
  const [updatedVersion, setUpdatedVersion] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [loadingVersions, setLoadingVersions] = useState(true);
  const webViewRef = useRef(null);
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);

  useEffect(() => {
    const handleBackPress = () => {
      if (webViewRef.current) {
        webViewRef.current.goBack(); // Go back in WebView if possible
        return true;
      } else if (showExitConfirmation) {
        setShowExitConfirmation(false); // Close exit confirmation if visible
        return true;
      } else {
        // Show exit confirmation if not in WebView and not already confirmed
        setShowExitConfirmation(true);
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );

    return () => backHandler.remove(); // Cleanup the event listener on component unmount
  }, [showExitConfirmation]);

  const handleExitConfirmation = () => {
    // Handle exit confirmation actions if needed
    setShowExitConfirmation(false);
  };

  const handleBackPress = () => {
    if (webViewRef.current) {
      if (webViewRef.current.canGoBack()) {
        webViewRef.current.goBack();
      } else {
        // Handle exit confirmation here
      }
      return true;
    }
    return false;
  };

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
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

  const authenticateUser = async () => {
    try {
      // Check if the user is already authenticated
      const isUserAuthenticated = await AsyncStorage.getItem('isUserAuthenticated');

      if (isUserAuthenticated) {
        // If authenticated, proceed with WebView
        setShowSplash(false);
      } else {
        // If not authenticated, show login screen
        setShowSplash(true);
        // You can redirect to the login screen or handle authentication flow accordingly
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <>
      {showSplash ? (
        <BataImageGif />
      ) : (
        <SafeAreaProvider>
          <StatusBar backgroundColor={WHITE} barStyle="dark-content" />
          <View style={styles.container}>
            <>
              <WebView
                ref={webViewRef}
                source={{ uri: prime_url }}

              />
              {showExitConfirmation && (
                Alert.alert(
                  "Hold on",
                  "Please use the app back button or home button to navigate",
                  [
                    {
                      text: "OK",
                      onPress: handleExitConfirmation,
                      style: "cancel"
                    },
                    { text: 'YES', onPress: () => BackHandler.exitApp() },
                  ]
                )
              )}
            </>
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