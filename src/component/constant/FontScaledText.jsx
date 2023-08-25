import React from 'react';
import { Input } from "native-base"
import { TextInput } from 'react-native-gesture-handler';
import { WalkStyle } from '../style/WalkStyle';


const FontScaledText = ({ children, style, ...otherProps }) => {
    return <>
        <TextInput style={WalkStyle.searchPlace} allowFontScaling={false} {...otherProps}>
            {children}
        </TextInput>
    </>

}
export default FontScaledText;