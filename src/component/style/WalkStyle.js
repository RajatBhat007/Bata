import { StyleSheet } from "react-native";
import { BGRED, BLACK, WHITE } from "../color";
import { boxStyle } from "../constant/comman-style";


export const WalkStyle = StyleSheet.create({
    dashboardContainer: {
        flex: 1,
        backgroundColor: WHITE
    },
    formFirstRow: {
        flexDirection: "row",
        marginVertical: 15,
        // paddingHorizontal: 25,
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
        borderRadius: 10,
        backgroundColor: WHITE,
        elevation: 5,
        top: 5,
        ...boxStyle,
    },
    searchPlace: {
        fontSize: 14,
        // paddingLeft: hp(2),
        padding: 10,
        borderRadius: 10,
    },
    commonTxtName: {
        fontSize: 14,
        lineHeight: 18,
        marginLeft: 3
    },
    getOTP: {
        backgroundColor: BGRED,
        height: 55,
        marginTop: "6%",
        width: "80%",
        right:15,
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
        lineHeight: 20
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
}
);