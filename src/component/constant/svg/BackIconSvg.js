import React from 'react';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { SvgXml } from 'react-native-svg';

const EyeIconSvg = ({  width = widthPercentageToDP(60), height = heightPercentageToDP(60)}) => {
    const svgLocation = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="24" fill="#000"/><path d="M33 16 15 31.5m15 .5H15V17" stroke="#fff" stroke-width="4"/></svg>    
    `;
    return <SvgXml width={width} height={height} xml={svgLocation} />;
};

export default EyeIconSvg;