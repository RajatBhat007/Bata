import React, { useState } from 'react';
import { View, StatusBar, ImageBackground, StyleSheet, Text, TextInput, KeyboardAvoidingView, Platform, Pressable } from 'react-native'; // Import KeyboardAvoidingView and Platform
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BGRED, DARK_BLACK } from './color';
import { WalkStyle } from './style/WalkStyle';
import PressableClick from './constant/PressableClick';
import { Url } from './environment';
import WebView from 'react-native-webview';
import EyeIconSvg from './constant/svg/EyeIconSvg';
import HideEyeIcon from './constant/svg/HideEyeIcon';

const backgroundImage = require('../assets/image1.png');

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [url, setUrl] = useState('')
    const [webview, setWebview] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const login = async () => {
        if (username !== '' && password !== '') {
            console.log(username);
            console.log(password);
            let bataurl = `${Url}?USERID=${username}&PASSWORD=${password}`
            setUrl(bataurl)
            setWebview(false)
        }
    };
    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                {(webview ?
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
                                                        placeholder="User Name"
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
                                        <Text style={{ textAlign: "center", top: 5, color: DARK_BLACK, fontSize: 10 }}>Powered By the Gamification Company</Text>
                                    </View>
                                </ImageBackground>
                            </View>
                        </KeyboardAwareScrollView>
                    </ImageBackground> :
                    <WebView source={{ uri: url }} />
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
});

export default LoginScreen;
