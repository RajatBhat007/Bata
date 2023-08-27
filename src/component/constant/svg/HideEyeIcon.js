import React from 'react';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { SvgXml } from 'react-native-svg';

const HideEyeIcon = ({ width = widthPercentageToDP(60), height = heightPercentageToDP(60) }) => {
    const svgLocation = `<svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.824 1.274c-5.463 0-8.702 6.48-8.702 6.48s3.239 6.478 8.702 6.478c5.335 0 8.574-6.479 8.574-6.479s-3.24-6.479-8.574-6.479Zm-.064 2.16a4.318 4.318 0 0 1 4.319 4.32 4.304 4.304 0 0 1-4.32 4.318 4.318 4.318 0 0 1-4.318-4.319A4.332 4.332 0 0 1 8.76 3.434Zm0 2.16c-1.188 0-2.16.971-2.16 2.16 0 1.187.972 2.159 2.16 2.159 1.187 0 2.16-.972 2.16-2.16 0-.216-.087-.41-.13-.605a1.062 1.062 0 0 1-.95.605 1.07 1.07 0 0 1-1.08-1.08c0-.432.259-.777.604-.95-.194-.065-.388-.13-.604-.13Z" fill="#A6A6A6"/><path stroke="#A6A6A6" stroke-linecap="round" d="M16.206 1.386 3.212 14.381"/></svg>      
  `;
    return <SvgXml width={width} height={height} xml={svgLocation} />;
};

export default HideEyeIcon;