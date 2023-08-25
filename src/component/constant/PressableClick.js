import React from 'react';
import { Pressable } from 'react-native';

const PressableClick = ({ children, style, ...otherProps }) => {
    return <>
        <Pressable {...otherProps} style={({ pressed }) => [
            { opacity: pressed ? 0.7 : 1.0, ...style}
        ]}>
            {children}
        </Pressable>
    </>

}
export default PressableClick;