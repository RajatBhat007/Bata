import React from 'react';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { SvgXml } from 'react-native-svg';

const EyeIconSvg = ({  width = widthPercentageToDP(60), height = heightPercentageToDP(60)}) => {
    const svgLocation = `<svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 0C3.273 0 .944 1.659 0 4c.944 2.341 3.273 4 6 4s5.056-1.659 6-4c-.944-2.341-3.273-4-6-4Zm0 6.667C4.495 6.667 3.273 5.472 3.273 4c0-1.472 1.222-2.667 2.727-2.667S8.727 2.528 8.727 4c0 1.472-1.222 2.667-2.727 2.667ZM6 2.4c-.905 0-1.636.715-1.636 1.6 0 .885.73 1.6 1.636 1.6.905 0 1.636-.715 1.636-1.6 0-.885-.73-1.6-1.636-1.6Z" fill="#ADADAD"/></svg>    
    `;
    return <SvgXml width={width} height={height} xml={svgLocation} />;
};

export default EyeIconSvg;