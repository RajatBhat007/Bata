import React, { useState, useEffect } from 'react';
import { BackHandler, Alert, StatusBar, StyleSheet, View,Linking} from 'react-native';
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
    }, 1650);
  }, []);

  useEffect(() => {
    async function checkForUpdate() {
      const updateNeeded = await VersionCheck.needUpdate();

      if (updateNeeded.isNeeded) {
        // Show an alert to the user
        Alert.alert(
          'Update Required',
          'A new version of the app is available. Please update to continue using the app.',
          [
            {
              text: 'Update',
              onPress: () => {
                // Open the app store link to allow the user to update
                Linking.openURL(updateNeeded.storeUrl);
              },
            },
          ],
          { cancelable: false }
        );
      }
    }

    checkForUpdate();
  }, []);

  // useEffect(() => {
  //   const backAction = () => {
  //     if (showExitConfirmation) {
  //       return false;
  //     } else {
  //       setShowExitConfirmation(true);
  //       return true;
  //     }
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () => backHandler.remove(); // Cleanup event listener on unmount
  // }, [showExitConfirmation]);

  // const handleExitConfirmation = () => {
  //   // Hide the exit confirmation and allow back to close the app
  //   setShowExitConfirmation(false);
  // };

  // const exitApp = () => {
  //   BackHandler.exitApp();
  // };

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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});

export default App;
