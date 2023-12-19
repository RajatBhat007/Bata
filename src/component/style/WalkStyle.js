import { StyleSheet } from "react-native";
import { BGRED, BLACK, DARK_BLACK, WHITE } from "../color";
import { boxStyle } from "../constant/comman-style";


export const WalkStyle = StyleSheet.create({
    dashboardContainer: {
        flex: 1,
    },
    formFirstRow: {
        flexDirection: "row",
        marginVertical: 15,
        justifyContent:"center",
        alignItems:"center",
        marginHorizontal: 0,
    },
    formTxt: {
        marginBottom: 0
    },
    commonTxtName: {
        fontSize: 14,
        lineHeight: 18,
        marginLeft: 3
    },
    viewElement: {
        marginVertical:2,
        borderRadius: 12,
        backgroundColor: WHITE,
        // elevation: 5,
        // ...boxStyle,
    },
    searchPlace: {
        fontSize: 14,
        // paddingLeft: hp(2),
        padding: 10,
        borderRadius: 10,
    },
    commonTxtName: {
        color:DARK_BLACK,
        fontWeight:"bold",
        fontSize: 14,
        lineHeight: 18,
        marginLeft: 3
    },
    getOTP: {
        backgroundColor: BGRED,
        height: 45,
        marginTop:5,
        width: "100%",
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        flexDirection: "row"
    },
    getOTPText: {
        textAlign: "center",
        color: WHITE,
        fontSize: 16,
        fontWeight:"bold",
        lineHeight: 20,
    },
    getOTP1: {
        backgroundColor: WHITE,
        height: 55,
        marginTop: "6%",
        ...boxStyle,
        elevation:6,
        width: "80%",
        right:15,
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        flexDirection:"row"
    },
    getOTPText1: {
        textAlign: "center",
        color: BLACK,
        marginLeft:5,
        fontSize: 16,
        lineHeight: 20
    },
    eyeIconContainer: {
        position: 'absolute',
        right: 30,
        top: 0,
        justifyContent: 'center',
        height: '100%',
        paddingHorizontal: 10,
    },
}
);