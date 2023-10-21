import React, { useState, useEffect } from 'react';
import { View, StatusBar, ImageBackground, StyleSheet, Text, TextInput, KeyboardAvoidingView, Platform, Pressable, Alert, Linking,BackHandler, ActivityIndicator} from 'react-native'; // Import KeyboardAvoidingView and Platform
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BGRED, DARK_BLACK } from './color';
import { WalkStyle } from './style/WalkStyle';
import PressableClick from './constant/PressableClick';
import { Url, bataUrllogin, prime_url } from './environment';
import EyeIconSvg from './constant/svg/EyeIconSvg';
import HideEyeIcon from './constant/svg/HideEyeIcon';
import AsyncStorage from '@react-native-async-storage/async-storage'; // or any other storage library you prefer
import WebViewScreen from './WebViewScreen';


const backgroundImage = require('../assets/image1.png');

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    console.log(username, ".....11");
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useState('')
    const [url, setUrl] = useState('')
    const [bataurl, setBataurl] = useState('')
    const [webview, setWebview] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [hideLoginScreen, sethideLoginSreen] = useState(false);
    const [showExitConfirmation, setShowExitConfirmation] = useState(false);
    const [userData, setUserData] = useState({
        UserName: "",
        UserID: "",
        ORGID: "",
        fullname:""
    });
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // New loading state

    const handleLogin = async () => {
        // Simulate login logic
        setIsLoggedIn(true);
        await AsyncStorage.setItem('lastLoginDate', new Date().toString());
        const lastLoginDate = await AsyncStorage.getItem('lastLoginDate');
        console.log('lastlogindate inside', lastLoginDate);

    };

 

    useEffect(() => {
        if (isLoading) {
            const loaderTimer = setTimeout(() => {
                setIsLoading(false);
            }, 400); // 2 seconds
            return () => clearTimeout(loaderTimer);
        }
    }, [isLoading]);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                <ActivityIndicator size="large" color="red" />
                <Text style={{ color: 'red', fontSize: 20 }}>Loading, please wait for some time</Text>
            </View>
        );
    }
    const login = async () => {
        console.log('kkkk');

        if (username !== '' && password !== '') {
            console.log(username);
            console.log(password);

            const options = {
                method: 'GET',
                headers: { accept: 'application/json', authkey: '318438A60qs5Ysgqr5e47c80dP1' }
            };
            console.log(options);

            let result = await fetch(`${Url}?USERID=${username}&PASSWORD=${password}`, options)
            console.log(result);

            let response = await result.json()
            console.log(response, "......2222");

            if (response.ResponseCode === 'SUCCESS') {
                console.log('status code 200', response.message);
                let bataurl = `${prime_url}?USERID=${username}&PASSWORD=${password}`
                console.log(prime_url);
                await AsyncStorage.setItem('bataurl', bataurl);

                // Set the userData state with dynamic data from the response
                setUserData({
                    UserName: response.UserName,
                    UserID: response.UserID,
                    ORGID: response.ORGID,
                    fullname:response.fullname
                });

                setUrl(bataurl)
                handleLogin()

            } else if (response.ResponseCode === 'FAILURE') {

                Alert.alert(
                    "FAILURE",
                    (response.ResponseMessage),
                    [
                        {
                            text: "OK",
                            onPress: handleExitConfirmation,
                            style: "cancel"
                        },
                    ]
                )
            }
            // Handle other cases here if needed
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleExitConfirmation = () => {
        // Hide the exit confirmation and allow back to close the app
        setUsername('')
        setPassword('')
        setIsLoggedIn(false)

    };

    const linking = {
        async getInitialURL() {
            // Check if app was opened from a deep link
            const url = await Linking.getInitialURL();
            if (url != null) {
                return url;
            }
            // Check if there is an initial firebase notification

        },
        subscribe(listener) {
            const onReceiveURL = ({ url }) => listener(url);
            console.log(onReceiveURL, "7777");
            // Listen to incoming links from deep linking
            Linking.addEventListener('url', onReceiveURL);

            const url = message?.data?.link;
            if (url) {

                listener(url);
            }
        },
    }

    const handleNavigationChange = (navState) => {
        const { url: newUrl } = navState
        if (newUrl.startsWith('https://tgc.onelink.me')) {
            console.log(newUrl, "....ww");
            // Redirect to the app using deep linking
            const deepLinkURL = `https://tgc.onelink.me/1Ut0/jouhje9i?Orgid=15&UID=${userData.UserName}&name=${userData.fullname}`;

            Linking.openURL(deepLinkURL);
        }
    };
    
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                {(isLoggedIn ?

                    <WebViewScreen
                    url={url}
                    userData={userData}
                    onNavigationStateChange={handleNavigationChange}/>
                    :
                    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                        <KeyboardAwareScrollView
                            contentContainerStyle={styles.scrollViewContainer}
                            keyboardShouldPersistTaps="handled"
                        >
                            <View style={styles.imageContainer}>
                                <ImageBackground
                                    source={require('../assets/image5.png')}
                                    style={styles.image}
                                    imageStyle={{ borderRadius: 15 }}
                                >
                                    <View style={{ marginTop: "40%" }}>
                                        <View>
                                            <Text style={{ color: BGRED, fontSize: 24, justifyContent: "center", alignItems: "center", marginLeft: 20, fontWeight: "bold" }}>Login</Text>
                                        </View>
                                        <View style={WalkStyle.formFirstRow}>
                                            <View style={{ width: '90%' }}>
                                                <View style={WalkStyle.formTxt}>
                                                    <Text style={WalkStyle.commonTxtName}>User Id</Text>
                                                </View>
                                                <View style={WalkStyle.viewElement}>
                                                    <TextInput
                                                        style={[styles.input]}
                                                        placeholder="User Id"
                                                        placeholderTextColor="#34437a4d"
                                                        keyboardType="default"
                                                        maxLength={30}
                                                        value={username}
                                                        onChangeText={txt => {
                                                            setUsername(txt)
                                                        }}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                        <View style={WalkStyle.formFirstRow}>
                                            <View style={{ width: '90%' }}>
                                                <View style={WalkStyle.formTxt}>
                                                    <Text style={WalkStyle.commonTxtName}>Password</Text>
                                                </View>
                                                <View style={WalkStyle.viewElement}>
                                                    <TextInput
                                                        style={[styles.input]}
                                                        placeholder="Password"
                                                        placeholderTextColor="#34437a4d"
                                                        keyboardType="default"
                                                        maxLength={30}
                                                        secureTextEntry={!showPassword}
                                                        value={password}
                                                        onChangeText={txt => {
                                                            setPassword(txt)
                                                        }}
                                                    />
                                                    <Pressable onPress={togglePasswordVisibility} style={WalkStyle.eyeIconContainer}>
                                                        {showPassword ? (
                                                            <EyeIconSvg width={18} height={18} />
                                                        ) : (
                                                            <HideEyeIcon width={18} height={18} />
                                                        )}
                                                    </Pressable>
                                                </View>
                                            </View>
                                        </View>
                                        <PressableClick
                                            style={WalkStyle.getOTP} onPress={login}>
                                            <Text accessible={true}
                                                style={WalkStyle.getOTPText}>Login</Text>
                                        </PressableClick>
                                        {/* <PressableClick
                                 style={WalkStyle.getOTP1}>
                                 <LinkInIconSvg width={20} height={20}></LinkInIconSvg>
                                 <Text accessible={true}
                                     style={WalkStyle.getOTPText1}>Continue with LinkeIn</Text>
                             </PressableClick> */}
                                        <Text style={{ textAlign: "center", top: 5, color: DARK_BLACK, fontSize: 10 }}>Powered by The Gamification Company</Text>
                                    </View>
                                </ImageBackground>
                            </View>
                        </KeyboardAwareScrollView>
                    </ImageBackground>

                )}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    contentContainer: {
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    image: {
        width: 390,
        height: 590,
        alignSelf: 'center',
        marginTop: "25%",
        borderRadius: 10,
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 7,
        paddingBottom: 50,
        borderRadius: 10
    },

    input:{
        height: 55,
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 12,
        color: 'black',
        backgroundColor: 'white',
        fontSize: 16,
        fontFamily: 'Inter',
        fontWeight: '500',
        letterSpacing: -0.352,
    }

});

export default LoginScreen;


