import React, { useEffect, useRef } from 'react';
import { Alert, BackHandler, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import { WHITE } from './color';

const WebViewScreen = () => {

  useEffect(() => {
    const backAction = () => {
      Alert.alert( 'Exit App',
      'Are you sure you want to exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  const webViewRef = useRef(null);

  // Create a function to handle Android hardware back button behavior within WebView
  const handleAndroidBackButton = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
      return true; // WebView handled the back press
    }
    return false; // WebView can't go back, handle back press for your app navigation
  };

  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={WHITE} barStyle="dark-content" />
      <View style={styles.container}>
        <WebView
          ref={webViewRef}
          source={{ uri: 'https://www.m2ost.in/m2ostconsole/' }}
          onNavigationStateChange={(navState) => {
            if (navState.canGoBack) {
              // WebView can go back, handle the back navigation
              webViewRef.current.goBack();
            }
          }}
        />
      </View>
    </SafeAreaProvider>
  );
};

export default WebViewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});