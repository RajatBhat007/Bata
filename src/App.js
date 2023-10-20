import React, { useState, useEffect } from 'react';
import { BackHandler, Alert, StatusBar, StyleSheet, View, Linking } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { WHITE } from './component/color';
import BataImageGif from './component/BataImageGif';
import LoginScreen from './component/LoginScreen';
import DeviceInfo from 'react-native-device-info';
import { checkVersionUpdate } from './component/uttilities/CommonUtils';


const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const installedVersion = DeviceInfo.getVersion();
  const installedBuildNumber = DeviceInfo.getBuildNumber();


  const latestVersion = '1.1.3'; // Update this to the latest version of your app
  const latestBuildNumber = '5';   // Update this to the latest build number of your app
  console.log(installedVersion,installedBuildNumber,".......");
  console.log(typeof(installedVersion),typeof(installedBuildNumber),".type...");

  console.log(); 
  console.log(installedVersion !== latestVersion || installedBuildNumber !== latestBuildNumber,".....111");
  console.log();
  if (installedVersion !== latestVersion || installedBuildNumber !== latestBuildNumber) {
    Alert.alert(
      'Update Required',
      'A new version of the app is available. Please update to the latest version.',
      [
        {
          text: 'Update',
          onPress: () => {
            // Open the respective app store for the update
            // For Android
            Linking.openURL('https://play.google.com/store/apps/details?id=com.tgcbata');

            // For iOS
            // Linking.openURL('https://apps.apple.com/app/idyourappid');
          },
        },
      ]
    );
  }

  const packageIdentifier = "com.tgcbata"; // Replace with your actual Android package identifier


  const checkVersionUpdate = async () => {
    try {
      const storedVersion = await AsyncStorage.getItem('storedVersion');
  
      const latestVersion = process.env.APP_VERSION_NAME;
      const latestBuildNumber = process.env.APP_VERSION_CODE;
  
      const installedVersion = DeviceInfo.getVersion();
      const installedBuildNumber = DeviceInfo.getBuildNumber();
  
      // Define your package identifier for Android (replace 'com.yourcompany.yourapp' with your actual package identifier)
      const packageIdentifier = "com.tgcbata";
  
      if (
        (installedVersion !== latestVersion || installedBuildNumber !== latestBuildNumber) &&
        storedVersion !== latestVersion
      ) {
        let updateMessage = '';
  
        if (Platform.OS === 'android') {
          updateMessage = "A new version of the app is available. Please consider updating to access new features.";
        } else if (Platform.OS === 'ios') {
          updateMessage = "A new version of the app is available. Please consider updating to access new features.";
        }
  
        Alert.alert(
          'Update Available',
          updateMessage,
          [
            {
              text: 'OK',
              onPress: () => {
                // Handle the user's response to the update message, if needed
                // For example, you can show more information or direct them to the app store when they press 'OK'
                Linking.openURL(`https://play.google.com/store/apps/details?id=com.tgcbata?id=${packageIdentifier}`);
                AsyncStorage.setItem('storedVersion', latestVersion); // Store the latest version as "seen"
              },
            },
          ]
        );
      }
    } catch (error) {
      // Handle any errors that may occur during the version check
    }
  };
  
  
  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 1650);
    checkVersionUpdate();
    console.log();
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

  async function checkForUpdates() {
    const updateNeeded = await VersionCheck.needUpdate();

    if (updateNeeded.isNeeded) {
      Alert.alert(
        'Update Required',
        'A new version of the app is available. Please update to the latest version.',
        [
          {
            text: 'Update',
            onPress: () => {
              // Open the app store for the update
              VersionCheck.openAppStore();
            },
          },
        ]
      );
    }
  }

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
