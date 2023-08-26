import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TextInput } from 'react-native';
import { BGRED, BLACK, WHITE } from './color';
import { boxStyle } from './constant/comman-style';
import { WalkStyle } from './style/WalkStyle';
import PressableClick from './constant/PressableClick';
import LinkInIconSvg from './constant/svg/LinkInIconSvg';

const SignInScreen = () => {
    
    return (
        <View style={styles.container}>
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
                                            keyboardType="default" // Use 'default' for a regular text input
                                            maxLength={30}

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
                                            keyboardType="default" // Use 'default' for a regular text input
                                            maxLength={30}
                                            secureTextEntry={true} // For password input
                                        />
                                    </View>
                                </View>
                            </View>
                            <PressableClick
                                style={WalkStyle.getOTP}>
                                <Text accessible={true}
                                    style={WalkStyle.getOTPText}>Login</Text>
                            </PressableClick>
                            <PressableClick
                                style={WalkStyle.getOTP1}>
                                <LinkInIconSvg width={20} height={20}></LinkInIconSvg>
                                <Text accessible={true}
                                    style={WalkStyle.getOTPText1}>Continue with LinkeIn</Text>
                            </PressableClick>
                            <Text style={{ textAlign: "center", top: 5, color: BLACK, fontSize: 10 }}>Powered By the gamification company</Text>
                        </View>
                    </ImageBackground>
                </View>
            </ImageBackground>
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
      height:"60%"
    },
    imageContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      top: 90,
      borderRadius:10
    },
    image: {
      width: '100%',
      height: '85%',
      resizeMode: 'contain',
      marginHorizontal:20,
      top:40,
      borderRadius: 10,
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
    input: {
      ...boxStyle,
      height: 40,
      width: '100%',
      paddingVertical: 10, // Adjust padding
      paddingHorizontal: 15, // Adjust padding
      color: 'black',
      backgroundColor: 'white',
      borderRadius: 10,
      fontSize: 16,
      fontFamily: 'Inter',
      fontWeight: '500',
      letterSpacing: -0.352,
    },
   
      circle:{
        height:120,
        width:116,
        backgroundColor:'#fff',
        borderRadius:100,
        position: 'absolute',
        left: '59.9%',
        top: -63,
        transform: [{ translateX: -100 }],
        // backgroundColor: 'trasparent',
        bordercolor:'rgba(0, 0, 0, .4);',
        justifyContent:'center',
        alignItems:"center"
        // border: 10px solid 
    },

  });

export default SignInScreen;


