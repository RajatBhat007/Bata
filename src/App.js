import React, { useState, useEffect } from 'react';
import { View, StatusBar, ActivityIndicator,Text,StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import { WHITE } from './component/color';
import BataImageGif from './component/BataImageGif';
import { prime_url } from './component/environment';


const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [loading, setLoading] = useState(false);
  const webViewRef = React.createRef();
  const INJECTED_JAVASCRIPT = `window.open = function() {};`;

  useEffect(() => {
    // Simulate a delay to show the splash screen for a few seconds
    const splashTimeout = setTimeout(() => {
      setShowSplash(false);
    }, 2000); // Adjust the duration as needed

    // Cleanup the timeout to avoid memory leaks
    return () => clearTimeout(splashTimeout);
  }, []);

  const handleLoadStart = () => {
    setLoading(true);
  };

  const handleLoadEnd = () => {
    setLoading(false);
  };

  return (
    <>
      {showSplash ? (
        <BataImageGif />
      ) : (
        <SafeAreaProvider>
          <StatusBar backgroundColor={WHITE} barStyle="dark-content" />
          <View style={{ flex: 1 }}>
            <WebView
              ref={webViewRef}
              source={{ uri: prime_url }}
              onLoadStart={handleLoadStart}
              onLoadEnd={handleLoadEnd}
              injectedJavaScript={INJECTED_JAVASCRIPT}
              scrollEnabled
              setSupportMultipleWindows={false}
              style={{ flex: 1 }}
            />
            {loading && (
              <View
                style={{
                  ...StyleSheet.absoluteFillObject,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}
              >
                <ActivityIndicator size="large" color="#FFFFFF" />
                <Text style={{ color: '#FFFFFF', marginTop: 10 }}>
                  Loading content...
                </Text>
              </View>
            )}
          </View>
        </SafeAreaProvider>
      )}
    </>
  );
};


export default App;