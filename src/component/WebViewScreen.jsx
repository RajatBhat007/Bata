import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useRef } from 'react';
import { BackHandler, Alert, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import WebView from 'react-native-webview';
import LoginScreen from './LoginScreen';
import { BGRED, LIGHT_GREEN } from './color';

const WebViewScreen = ({ url, userData, onNavigationStateChange, navigation }) => {
  const webViewRef = useRef(null);
  // const webViewRef = React.useRef(null);
  const [loading, setLoading] = useState(false);
  const INJECTED_JAVASCRIPT = `window.close = function() {};`;
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);
  const [internalNavigationStack, setInternalNavigationStack] = useState([]); // Track internal navigation
  const [externalNavigationStack, setExternalNavigationStack] = useState([]); // Track external navigation

  const INJECTEDJAVASCRIPT = `
  const meta = document.createElement('meta');
  meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
  meta.setAttribute('name', 'viewport');
  document.getElementsByTagName('head')[0].appendChild(meta);
`;


  useEffect(() => {
    console.log('isloggedOut', isLoggedOut);
    console.log('he;ll');
    console.log('update', url);
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

  // const handleNavigationChange = (navState) => {
  //   const { url: newUrl } = navState;
  //   console.log(newUrl);

  //   if (newUrl == 'https://www.m2ost.in/M2OST_NewDev_Console/') {
  //     console.log('login false');
  //     //  <LoginScreen/>
  //     setIsLoggedOut(true)
  //     console.log('login false123');

  //   }

  // };
  //   const INJECTED_JAVASCRIPt_Close = `
  //   // Your injected JavaScript code here

  //   // For example, close the current window after 5 seconds
  //   setTimeout(function() {
  //     window.close();
  //   }, 1000);`
  //   console.log('close');
  // ;

  // const onShouldStartLoadWithRequest = event => {
  //   const { url, navigationType } = event;

  //   // Check if it's a link being clicked (not an iframe, etc.)
  //   if (navigationType === 'click' && url !== webViewRef.current.props.source.uri) {
  //     // Handle the new tab link
  //     // You can navigate to the new URL, or perform any other logic here
  //     // For simplicity, we'll just open the link in the same WebView
  //     webViewRef.current.injectJavaScript(`window.location.href = "${url}";`);

  //     // Return false to prevent loading the new tab in the current WebView
  //     return false;
  //   }

  //   // Allow normal loading for other types of requests
  //   return true;
  // };

  // const handleFinishQuestion = () => {
  //   // Your logic for finishing a question

  //   // Close the current tab and navigate back to a specific URL
  //   webViewRef.current.injectJavaScript(`window.location.href = "https://www.m2ost.in/M2OST_Console_PriME/Dashboard";`);
  // };
  // const onMessageReceived = event => {
  //   console.log(event,"4444");
  //   // Check the message received from WebView
  //   if (event.nativeEvent.data === 'closeTabMessage') {
  //     // Close the WebView or handle the desired behavior
  //     // (Note: Closing the WebView might not close the entire tab in all scenarios)
  //     webViewRef.current.goBack(); // Go back in WebView history
  //   }
  // };

  // const onMessage = (event) => {
  //   // Handle the message received from the WebView
  //   const data = JSON.parse(event.nativeEvent.data);
  //   console.log('Message received from WebView:', data);
  // };

  // const closeWebView=()=>{
  //   NavigationContainer.goBack();
  // }

  // const sendMessageToWebView = () => {
  //   const script = 'window.postMessage("closeTabMessage", "*");';
  //   webViewRef.current.injectJavaScript(script);
  // };

  // // Event listener to handle messages from the web view
  // const onMessage = event => {
  //   console.log('Received message:', event.nativeEvent.data);
  //   // Handle the received message as needed
  // };
  // 
  const handleNavigationChange = (navState) => {
    const { url: newUrl } = navState;

    // Check if the user is logged out based on the URL
    if (newUrl === 'https://www.m2ost.in/M2OST_NewDev_Console/') {
      setIsLoggedOut(true);
    }

    // Update the canGoBack state based on WebView navigation
    setCanGoBack(navState.canGoBack);
  };

  

  const handleGoBack = () => {
    if (webViewRef.current && canGoBack) {
      webViewRef.current.goBack();
    }
  };



  return (
    <>
      {/* Check if the user is logged out and show the LoginScreen */}
      {isLoggedOut ? (
        <LoginScreen LoggedIn={isLoggedIn} />
      ) : (
        <>
          {/* Render the WebView */}
          <WebView
            ref={webViewRef}
            source={{ uri: url }}
            style={{ flex: 1 }}
            injectedJavaScript={INJECTED_JAVASCRIPT}
            scrollEnabled
            onNavigationStateChange={handleNavigationChange}
            hasZoom={false}
            injectedJavaScripts={INJECTEDJAVASCRIPT}
          />
          {/* Render the back button only if canGoBack is true */}
          {canGoBack && (
            <TouchableOpacity
              style={styles.goBackButton}
              onPress={handleGoBack}>
              {/* Your back button UI */}
              {/* For example, an icon or text */}
              <Text style={{ color: LIGHT_GREEN, fontSize: 14,bottom:15}}>Back</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({

  goBackButton: {
    color: BGRED,
    position: "absolute",
    right: 15,
    padding: 20,
    paddingHorizontal: 20,
    top: 0,
  },
});
export default WebViewScreen;
