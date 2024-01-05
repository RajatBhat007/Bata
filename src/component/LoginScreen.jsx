import React, { useState, useEffect, useCallback } from 'react';
import { View, StatusBar, ImageBackground, StyleSheet, Text, TextInput, KeyboardAvoidingView, Platform, Pressable, Alert, Linking, ActivityIndicator} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BGRED, BLACK, DARK_BLACK } from './color';
import { WalkStyle } from './style/WalkStyle';
import PressableClick from './constant/PressableClick';
import { Url, bataUrllogin } from './environment';
import EyeIconSvg from './constant/svg/EyeIconSvg';
import HideEyeIcon from './constant/svg/HideEyeIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WebViewScreen from './WebViewScreen';

const backgroundImage = { uri: 'https://www.m2ost.in/Bata_Content/Image/login-banner.PNG' };

const LoginScreen = ({ LoggedIn }) => {
    console.log(LoggedIn, 'LoggedIn value from web screen');
    const [LoggedInNew, setLoggedInNew] = useState(LoggedIn);
    const [username, setUsername] = useState('');
    console.log(username, ".....11");
    const [password, setPassword] = useState('');
    const [url, setUrl] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [userData, setUserData] = useState({
        UserName: "",
        UserID: "",
        ORGID: "",
        fullname: ""
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(false);

    
    const handleLogin = async () => {
        setIsLoggedIn(true);
        setLoggedInNew(false);
        const futureDate = new Date();
        futureDate.setFullYear(futureDate.getFullYear() + 10);
        await AsyncStorage.setItem('lastLoginDate', futureDate.toString());
        const bataurl1 = await AsyncStorage.getItem('bataurl');
        setUrl(bataurl1);
        setIsLoading(false);
    };

    useEffect(() => {
        const checkLastLoginDate = async () => {
            const lastLoginDate = await AsyncStorage.getItem('lastLoginDate');
            if (lastLoginDate) {
                const currentDate = new Date();
                const futureDate = new Date(lastLoginDate);
                if (currentDate < futureDate) {
                    const bataurl1 = await AsyncStorage.getItem('bataurl');
                    setUrl(bataurl1);
                    setIsLoggedIn(true);
                    setIsLoading(false);
                } else {
                    setIsLoggedIn(false);
                }
            }
        };
        checkLastLoginDate();
    }, [LoggedIn]);

    const login = async () => {
        setLoading(true);
        if (username !== '' && password !== '') {
            const options = {
                method: 'GET',
                headers: { accept: 'application/json', authkey: '318438A60qs5Ysgqr5e47c80dP1' },
            };

            try {
                let result = await fetch(`${Url}?USERID=${username}&PASSWORD=${password}`, options);
                let response = await result.json();

                if (response.ResponseCode === 'SUCCESS') {
                    let bataurl = `${bataUrllogin}?USERID=${username}&PASSWORD=${password}`;
                    await AsyncStorage.setItem('bataurl', bataurl);

                    setUserData({
                        UserName: response.UserName,
                        UserID: response.UserID,
                        ORGID: response.ORGID,
                        fullname: response.fullname,
                    });

                    setUrl(bataurl);
                    handleLogin();
                } else if (response.ResponseCode === 'FAILURE') {
                    Alert.alert(
                        'FAILURE',
                        response.ResponseMessage,
                        [
                            {
                                text: 'OK',
                                onPress: handleExitConfirmation,
                                style: 'cancel',
                            },
                        ]
                    );
                }
            } catch (error) {
                console.error('Login error:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    const handleExitConfirmation = () => {
        setUsername('')
        setPassword('')
        setIsLoggedIn(false)
        setLoggedInNew(false)
    };

    const linking = {
        async getInitialURL() {
            const url = await Linking.getInitialURL();
            if (url != null) {
                return url;
            }
        },
        subscribe(listener) {
            const onReceiveURL = ({ url }) => listener(url);
            console.log(onReceiveURL, "7777");
            Linking.addEventListener('url', onReceiveURL);

            const url = message?.data?.link;
            if (url) {

                listener(url);
            }
        },
    }
    const handleLoginPress = useCallback(async () => {
        setLoading(true);
        await login();
        setLoading(false);
    }, [login]);

    

    const handleNavigationChange = (navState) => {
        const { url: newUrl } = navState;
        console.log(newUrl);
        if (newUrl === 'https://www.m2ost.in/M2OST_Console_PriME') {
            console.log('login false');
            setIsLoading(false)
        }
        else if (newUrl.startsWith('https://tgc.onelink.me')) {
            console.log(newUrl, "....ww");
            const deepLinkURL = `https://tgc.onelink.me/1Ut0/jouhje9i?Orgid=15&UID=${userData.UserName}&name=${userData.fullname}`;

            Linking.openURL(deepLinkURL);
        }
    };
    useEffect(() => {
        if (LoggedInNew) {
            console.log(LoggedInNew, '12345555');
            setIsLoggedIn(false);
        } else {
            setLoggedInNew(false);
        }
        if (isLoading) {
            const loaderTimer = setTimeout(() => {
                setIsLoading(false);
            }, 400);
            return () => clearTimeout(loaderTimer);
        }
        if (isLoggedIn) {
            handleLogin();
        }
    }, [LoggedInNew, isLoading, isLoggedIn]);
    
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                <ActivityIndicator size="large" color="red" />
                <Text style={{ color: 'red', fontSize: 20 }}>Loading, please wait for some time</Text>
            </View>
        );
    }
    const onLoadStart = () => {
        setLoading(true);
      };
    
      const onLoadEnd = () => {
        setLoading(false);
      };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            {/* {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                    <ActivityIndicator size="large" color="red" />
                    <Text style={{ color: 'red', fontSize: 20 }}>Loading, please wait for some time</Text>
                </View>
            ) : ( */}
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                >
                    {(isLoggedIn ?

                        <WebViewScreen
                            url={url}
                            userData={userData}
                            onNavigationStateChange={handleNavigationChange} 
                            onLoadStart={onLoadStart}
                            onLoadEnd={onLoadEnd} 
                            />
                        :
                        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                            <KeyboardAwareScrollView
                                contentContainerStyle={styles.scrollViewContainer}
                                keyboardShouldPersistTaps="handled"
                            >
                                <View style={styles.card}>
                                    <View>
                                        <View>
                                            <Text style={{ color: BGRED, fontSize: 24, justifyContent: "center", textAlign: "center", fontWeight: "bold" }}>Login</Text>
                                            <Text style={{ color: BLACK, fontSize: 16, justifyContent: "center", textAlign: "center", fontWeight: "bold", marginTop: 20 }}>Login in to stay connected</Text>

                                        </View>
                                        <View style={WalkStyle.formFirstRow}>
                                            <View style={{ width: '100%' }}>
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
                                            <View style={{ width: '100%' }}>
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
                                            style={WalkStyle.getOTP}
                                            onPress={handleLoginPress}
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <ActivityIndicator size="small" color="white" />
                                            ) : (
                                                <Text accessible={true} style={WalkStyle.getOTPText}>
                                                    Login
                                                </Text>
                                            )}
                                        </PressableClick>
                                        <Text style={{ textAlign: "center", top: 5, color: DARK_BLACK, fontSize: 10 }}>Privacy Policy</Text>
                                    </View>
                                </View>
                            </KeyboardAwareScrollView>
                        </ImageBackground>
                    )}
                </KeyboardAvoidingView>
{/* 
            )} */}
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
        padding: 10
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
        borderRadius: 10,
    },

    input: {
        height: 45,
        width: '100%', 
        marginHorizontal: 'auto',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 12,
        color: 'black',
        backgroundColor: 'white',
        fontSize: 16,
        fontFamily: 'Inter',
        fontWeight: '500',
        letterSpacing: -0.352,
        borderWidth: 1,
        borderColor: 'black',
    },
    card: {
        backgroundColor: 'white',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 12,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0.5 },
        shadowOpacity: 0.6,
        elevation: 6,
        height: 400,
        marginTop: "100%"
    },
});

export default LoginScreen;