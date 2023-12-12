import React, { useState, useEffect, useRef } from 'react';
import { BackHandler, Alert, StatusBar, StyleSheet, View, Linking } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { WHITE } from './component/color';
import BataImageGif from './component/BataImageGif';
import DeviceInfo from 'react-native-device-info';
import firestore from '@react-native-firebase/firestore';
import WebView from 'react-native-webview';
import { prime_url } from './component/environment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './component/LoginScreen';

const App = () => {
  const isMounted = useRef(true);
  const webView = useRef();
  const [showSplash, setShowSplash] = useState(true);
  const [updatedVersion, setUpdatedVersion] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [loadingVersions, setLoadingVersions] = useState(true);
  const webViewRef = useRef(null);
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const [webViewKey, setWebViewKey] = useState(1); // Initialize with a key valu

  // useEffect(() => {
  //   const handleBackPress = () => {
  //     if (webViewRef.current) {
  //       webViewRef.current.goBack(); // Go back in WebView if possible
  //       return true;
  //     } else if (showExitConfirmation) {
  //       setShowExitConfirmation(false); // Close exit confirmation if visible
  //       return true;
  //     } else {
  //       // Show exit confirmation if not in WebView and not already confirmed
  //       setShowExitConfirmation(true);
  //       return true;
  //     }
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     handleBackPress
  //   );

  //   return () => backHandler.remove(); // Cleanup the event listener on component unmount
  // }, [showExitConfirmation]);
  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const isUserAuthenticated = await AsyncStorage.getItem('isUserAuthenticated');
        const loginTimestamp = await AsyncStorage.getItem('loginTimestamp');
    
        console.log('isUserAuthenticated:', isUserAuthenticated);
        console.log('loginTimestamp:', loginTimestamp);
  
        if (isUserAuthenticated || process.env.NODE_ENV === 'development') {
          // Check if the user has logged in within the last 10 years
          if (loginTimestamp && Date.now() - parseInt(loginTimestamp, 10) < 10 * 365 * 24 * 60 * 60 * 1000) {
            // If logged in within the last 10 years, navigate to the dashboard directly
            navigateToDashboard();
          } else {
            // If not logged in within the last 10 years, show splash screen
            setShowSplash(true);
            // Set the login timestamp for the next 10 years
            await AsyncStorage.setItem('loginTimestamp', Date.now().toString());
          }
        } else {
          // If not authenticated, show splash screen
          setShowSplash(true);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };
  
    const navigateToDashboard = () => {
      // Navigate to the dashboard screen
      // Replace the following line with your navigation logic
      console.log('Navigating to Dashboard');
    };
  
    authenticateUser();
  }, []);
  

  useEffect(() => {
    const handleBackPress = () => {
      if (webViewRef.current) {
        if (webViewRef.current.canGoBack) {
          webViewRef.current.goBack(); // Go back in WebView if possible
          return true;
        }
      } else if (showExitConfirmation) {
        setShowExitConfirmation(false); // Close exit confirmation if visible
        return true;
      } else {
        // Show exit confirmation if not in WebView and not already confirmed
        setShowExitConfirmation(true);
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      backHandler.remove();
      isMounted.current = false;
    };
  }, [showExitConfirmation]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleExitOrBackPress
    );

    return () => backHandler.remove(); // Cleanup the event listener on component unmount
  }, [showExitConfirmation]);

  useEffect(() => {
    const backAction = () => {
      if (webViewRef.current && webViewRef.current.canGoBack()) {
        // Go back in WebView if possible
        webViewRef.current.goBack();
        return true;
      } else {
        // If no history in WebView, do nothing
        return false;
      }
    };
  
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
  
    return () => backHandler.remove();
  }, [webViewRef]);

  const handleExitOrBackPress = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
      return true;
    } else if (showExitConfirmation) {
      setShowExitConfirmation(false);
      return true;
    } else {
      setShowExitConfirmation(true);
      return true;
    }
  };

  const handleExitConfirmation = () => {
    setShowExitConfirmation(false);
  };

  // const handleNavigationStateChange = (navState) => {
  //   setShowExitConfirmation(!navState.canGoBack);
  // };

  const handleNavigationStateChange = (navState) => {
    if (navState.canGoBack) {
      // If WebView can go back, enable the system back button
      BackHandler.addEventListener('hardwareBackPress', handleBackPressInWebView);
    } else {
      // If WebView cannot go back, disable the system back button
      BackHandler.removeEventListener('hardwareBackPress', handleBackPressInWebView);
    }
  };

  const handleBackPressInWebView = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
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
            {/* <>
              <WebView
                key={webViewKey} // Reload WebView when the key changes
                ref={webViewRef}
                source={{ uri: prime_url }}
                onNavigationStateChange={handleNavigationStateChange}
                scrollEnabled
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
            </> */}
            <LoginScreen/>
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




