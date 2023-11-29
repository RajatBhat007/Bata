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
import { PERMISSIONS } from "react-native-permissions";

const App = () => {
  const isMounted = useRef(true);
  const [showSplash, setShowSplash] = useState(true);
  const [updatedVersion, setUpdatedVersion] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [loadingVersions, setLoadingVersions] = useState(true);
  const webViewRef = useRef(null);
  // const webViewRef = React.useRef(null);
  const [loading, setLoading] = useState(false);
  const INJECTED_JAVASCRIPT = `window.close = function() {};`;
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);

  useEffect(() => {
    const handleBackPress = () => {
      if (webViewRef.current) {
        webViewRef.current.goBack(); // Go back in WebView if possible
        return true;
      } else {
        if (showExitConfirmation) {
          // Handle exit confirmation actions if needed
          setShowExitConfirmation(false);
        } else {
          setShowExitConfirmation(true);
        }
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
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    const status = await getCameraPermissions();
    setHasPermission(status);
  };

  const getCameraPermissions = async () => {
    const status = await request(
      Platform.select({
        android: PERMISSIONS.ANDROID.CAMERA,
        ios: PERMISSIONS.IOS.CAMERA,
      }),
    );

    return status === RESULTS.GRANTED;
  };

  return (
    <>
      {showSplash ? (
        <BataImageGif />
      ) : (
        <SafeAreaProvider>
          <StatusBar backgroundColor={WHITE} barStyle="dark-content" />
          <View style={styles.container}>
            {/* <LoginScreen /> */}
            <>
              {/* <WebView
         ref={webViewRef}
         source={{ uri: url }}
         onLoadStart={() => setLoading(true)}
         onLoadEnd={() => setLoading(false)}
         onLoad={() => setLoading(false)}
         style={{ flex: 1 }}
        // injectedJavaScript={INJECTED_JAVASCRIPT}
         injectedJavaScript={INJECTED_JAVASCRIPt_Close}
         scrollEnabled
        //  onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
         setSupportMultipleWindows={false} // This prevents redirecting to a new browser window
         // onNavigationStateChange={onNavigationStateChange}
      /> */}


              <WebView
                ref={webViewRef}
                source={{ uri: prime_url }}
              //   onLoadStart={() => setLoading(true)}
              //   onLoadEnd={() => setLoading(false)}
              //   onLoad={() => setLoading(false)}
              //   style={{ flex: 1 }}
              //   injectedJavaScript={INJECTED_JAVASCRIPT}
              //   scrollEnabled
              //   setSupportMultipleWindows={false}
              // // onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
              // // onNavigationStateChange={onNavigationStateChange}
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