import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TextInput, Linking } from 'react-native';
import { BGRED,DARK_BLACK } from './color';
import { boxStyle } from './constant/comman-style';
import { WalkStyle } from './style/WalkStyle';
import PressableClick from './constant/PressableClick';
import { Url } from './environment';
import WebView from 'react-native-webview';

const SignInScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [url, setUrl] = useState('')
    const [webview, setWebview] = useState(true)
    const [error, setError] = useState({
        username: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
      };
    const login = async () => {
        if (username.trim() === '') {
            setError(prevError => ({ ...prevError, username: 'Username is required' }));
            return;
        }

        if (password.trim() === '') {
            setError(prevError => ({ ...prevError, password: 'Password is required' }));
            return;
        }
        setError({ username: '', password: '' });
        if (username !== '' && password !== '') {
            console.log(username);
            console.log(password);
            let bataurl = `${Url}?USERID=${username}&PASSWORD=${password}`
            setUrl(bataurl)
            setWebview(false)
        }
    };

    return (
        <View style={styles.container}>
            {webview ? (
                <WebView source={{ uri: url }} />
            ) : (
                <ImageBackground
                    source={require('../assets/image1.png')}
                    style={styles.backgroundImage}
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
                </ImageBackground>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'contain',
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        top: 50,
        marginHorizontal: 7,
        borderRadius: 10
    },
    image: {
        width: '100%',
        height: '85%',
        resizeMode: 'contain',
        marginHorizontal: 25,
        top: 40,
        borderRadius: 10,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    input: {
        ...boxStyle,
        height: 55,
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 12,
        color: 'black',
        backgroundColor: 'white',
        borderRadius: 10,
        fontSize: 16,
        fontFamily: 'Inter',
        fontWeight: '500',
        letterSpacing: -0.352,
    },

    circle: {
        height: 120,
        width: 116,
        backgroundColor: '#fff',
        borderRadius: 100,
        position: 'absolute',
        left: '59.9%',
        top: -63,
        transform: [{ translateX: -100 }],
        bordercolor: 'rgba(0, 0, 0, .4);',
        justifyContent: 'center',
        alignItems: "center"
    },

});

export default SignInScreen;











