import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TextInput, Linking } from 'react-native';
import { BGRED, BLACK, DARK_BLACK} from './color';
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

    const login = async () => {
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
            {(webview ?
                <ImageBackground
                    source={require('../assets/image1.png')}
                    style={styles.backgroundImage}
                >
                    <View style={styles.imageContainer}>
                        <ImageBackground
                            source={require('../assets/image3.png')}
                            style={styles.image}
                            imageStyle={{ borderRadius: 15 }}
                        >
                            <View style={{ marginTop: "20%", marginLeft: 10 }}>

                                <Text style={{ justifyContent: "center", color: BGRED, fontSize: 24 }}>Login</Text>
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
                                                secureTextEntry={true}
                                                value={password}
                                                onChangeText={txt => {
                                                    setPassword(txt)
                                                }}
                                            />
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
                                <Text style={{ textAlign: "center", top: 5, color: DARK_BLACK, fontSize: 10 }}>Powered By the gamification company</Text>
                            </View>
                        </ImageBackground>
                    </View>
                </ImageBackground> :
                <WebView source={{ uri: "https://www.m2ost.in/m2ostconsole/Account/LoginAPICheck?USERID=bata6&PASSWORD=Tgc@1234" }} />
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
        height: "60%"
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        top: 90,
        borderRadius: 10
    },
    image: {
        width: '100%',
        height: '85%',
        resizeMode: 'contain',
        marginHorizontal: 20,
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
        borderRadius:12,
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


