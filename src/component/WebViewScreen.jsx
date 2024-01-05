import React, { useState, useEffect, useRef } from 'react';
import { BackHandler, StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import WebView from 'react-native-webview';
import LoginScreen from './LoginScreen';
import { BGRED } from './color';

const WebViewScreen = ({ url, userData, onNavigationStateChange, navigation }) => {
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    console.log('isloggedOut', isLoggedOut);
    console.log('he;ll');
    console.log('update', url);
    const handleBackPress = () => {
      if (webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      } else {
        if (showExitConfirmation) {
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


  const handleNavigationChange = (navState) => {
    const { url: newUrl } = navState;
    console.log(newUrl, '...2222');
    if (newUrl === 'https://www.m2ost.in/M2OST_Console_PriME/') {
      setIsLoggedOut(true);
      setLoading(false);
    } else {
      setIsLoggedOut(false);
    }
    setCanGoBack(navState.canGoBack);
  };

  return (
    <View style={{ flex: 1 }}>
      {isLoggedOut ? (
        <LoginScreen LoggedIn={isLoggedIn} />
      ) : (
        <>
          <WebView
            ref={webViewRef}
            source={{ uri: url }}
            style={{ flex: 1 }}
            scrollEnabled
            onNavigationStateChange={handleNavigationChange}
            renderLoading={() => (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent',marginBottom:"60%"}}>
                <ActivityIndicator size="large" color="red" />
                <Text style={{ color: 'red', fontSize: 20, textAlign: 'center', marginTop: 10 }}>
                  Loading, please wait for some time
                </Text>
              </View>
            )}
            startInLoadingState={true}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({

  goBackButton: {
    color: BGRED,
    position: "absolute",
    right: 15,
    padding: 20,
    paddingHorizontal: 20,
    bottom: 0,
    top: 20
  },
});
export default WebViewScreen;
