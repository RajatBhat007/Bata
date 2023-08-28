import React, { useState ,useEffect} from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage'; // or any other storage library you prefer


const backgroundImage = require('../assets/image1.png');

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [url, setUrl] = useState('')
    const [bataurl,setBataurl]=useState('')
    const [webview, setWebview] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [hideLoginScreen,sethideLoginSreen]=useState(false)

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = async () => {
        // Simulate login logic
        setIsLoggedIn(true);
        await AsyncStorage.setItem('lastLoginDate', new Date().toString());
        const lastLoginDate = await AsyncStorage.getItem('lastLoginDate');
        console.log('lastlogindate inside',lastLoginDate);
        
 };

      useEffect(() => {
        const checkLastLoginDate = async () => {
          const lastLoginDate = await AsyncStorage.getItem('lastLoginDate');
          console.log('lastlogindate',lastLoginDate);
          if (lastLoginDate) {
            const currentDate = new Date();
            console.log("current date",currentDate);
            const daysSinceLastLogin = Math.floor(
              (currentDate - new Date(lastLoginDate)) / (1000 * 60 * 60 * 24)
            );
            console.log("days",daysSinceLastLogin);
            if (daysSinceLastLogin < 15) {
                const bataurl1 = await AsyncStorage.getItem('bataurl');
                console.log("bataUrl1111",bataurl1);
                setUrl(bataurl1)
                setIsLoggedIn(true);
          
            } else {
              setIsLoggedIn(false);
            }
          }
        };
    
        checkLastLoginDate();
      }, []);
      

    const login = async () => {
        console.log('kkkk');
 
        if (username !== '' && password !== '') {
            console.log(username);
            console.log(password);
            let bataurl = `${Url}?USERID=${username}&PASSWORD=${password}`
            console.log(bataurl);
            await AsyncStorage.setItem('bataurl', bataurl);
            setUrl(bataurl)
            // setWebview(false)
            handleLogin()

        }
    };
    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    // const calculate15Days=()=>{
    //     console.log('--------------------------');
    //    var LoginTime= new Date()
    //     console.log('loginTime',LoginTime);
    //     var futureDateDynamic=LoginTime
    //     console.log("futureDateDynamic",futureDateDynamic);
    //     var twoDaysLater=new Date(futureDateDynamic)
    //     twoDaysLater.setDate(twoDaysLater.getDate() + 2);
    //     console.log("twoDaysLater",twoDaysLater);
    //     console.log("show",hideLoginScreen);
    //     setTimeout(() => {
    //         var currentDate=new Date();
    //         console.log("currentDate",currentDate);
    //         if(new Date(LoginTime)<currentDate && twoDaysLater>currentDate){
    //             sethideLoginSreen(true)
    //             console.log('hide---',hideLoginScreen);
    //          }
    //       }, 2000);
    // }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                {(isLoggedIn ?
                
                       <WebView source={{ uri:url}}/>
                     
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
                                     <Text style={{ textAlign: "center", top: 5, color: DARK_BLACK, fontSize: 10 }}>Powered By The Gamification Company</Text>
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
   
    // input:{
    //     height: 55,
    //     width: '100%',
    //     paddingVertical: 10,
    //     paddingHorizontal: 15,
    //     borderRadius: 12,
    //     color: 'black',
    //     backgroundColor: 'white',
    //     fontSize: 16,
    //     fontFamily: 'Inter',
    //     fontWeight: '500',
    //     letterSpacing: -0.352,
    // }
    
});

export default LoginScreen;