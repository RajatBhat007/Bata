import React, { useState, useEffect } from 'react';
import { BackHandler, Alert } from 'react-native';
import WebView from 'react-native-webview';

const WebViewScreen = ({ url, userData, onNavigationStateChange }) => {
  console.log(userData, ".......wwww");
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to exist?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'YES', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const backAction = () => {
      if (showExitConfirmation) {
        return false;
      } else {
        setShowExitConfirmation(true);
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove(); // Cleanup event listener on unmount
  }, [showExitConfirmation]);

  const handleExitConfirmation = () => {
    // Handle exit confirmation actions if needed
    setShowExitConfirmation(false);
  };

  return (
    <>
      <WebView
        source={{ uri: url }}
        onNavigationStateChange={onNavigationStateChange}
      />

      {/* {showExitConfirmation && (
        Alert.alert(
            "Hold on",
            "Please use the app back button or home button to navigate",
            [
              {
                text: "OK",
                onPress: handleExitConfirmation,
                style: "cancel"
              },
              {text: 'YES', onPress: () => BackHandler.exitApp()},
            ]
          )
      )} */}
    </>
  );
};

export default WebViewScreen;