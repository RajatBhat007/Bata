import React, { useState, useEffect } from 'react';
import BataImageGif from './component/BataImageGif';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Alert, BackHandler, StatusBar, StyleSheet, View } from 'react-native';
import { WHITE } from './component/color';
import LoginScreen from './component/LoginScreen';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 2230);
  }, []);

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Ok',
          onPress: () => null,
          style: 'Ok',
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove(); // Cleanup event listener on unmount
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE, // Set the background color of the parent View
  },
});

export default App;
