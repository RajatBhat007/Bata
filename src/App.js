import React, { useState, useEffect } from 'react';
import BataImageGif from './component/BataImageGif';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, StyleSheet, View } from 'react-native';
import { WHITE } from './component/color';
import SignInScreen from './component/SignInScreen';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 2229);
  }, []);

  return (
    <>
      {showSplash ? (
        <BataImageGif />
      ) : (
        <SafeAreaProvider>
          <StatusBar backgroundColor={WHITE} barStyle={"dark-content"} />
          <View style={styles.container}>
            <SignInScreen />
          </View>
        </SafeAreaProvider>
      )}
    </>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});