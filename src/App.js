import React, { useState, useEffect } from 'react';
import { BackHandler, Alert, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { WHITE } from './component/color';
import BataImageGif from './component/BataImageGif';
import LoginScreen from './component/LoginScreen';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 2230);
  }, []);

  useEffect(() => {
    const backAction = () => {
      if (showExitConfirmation) {
        // If exit confirmation is already showing, allow back to close the app
        return false;
      } else {
        // Show exit confirmation and prevent back from closing the app
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
    // Hide the exit confirmation and allow back to close the app
    setShowExitConfirmation(false);
  };

  const exitApp = () => {
    BackHandler.exitApp();
  };

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

      {/* Exit confirmation pop-up */}
      {showExitConfirmation && (
        Alert.alert(
          "Hold on",
          "Please use the app back button or home button  to navigate",
          [
            {
              text: "OK",
              onPress: handleExitConfirmation,
              style: "cancel"
            },

          ]
        )
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});

export default App;
