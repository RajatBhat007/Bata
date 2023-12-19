import React from 'react';
import { SvgXml } from "react-native-svg";


const BackIconSvg = ({ width, height, color = "#303342" }) => {
    const svgCross = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g fill-rule="evenodd" clip-rule="evenodd" fill="#000"><path d="M14.084 1.5c2.683 0 4.416 1.635 4.416 4.165v8.669c0 2.53-1.733 4.166-4.416 4.166H5.916c-2.683 0-4.416-1.636-4.416-4.166V5.665C1.5 3.135 3.233 1.5 5.916 1.5h8.168ZM5.916 20h8.168C17.622 20 20 17.723 20 14.334V5.665C20 2.276 17.622 0 14.084 0H5.916C2.378 0 0 2.276 0 5.665v8.669C0 17.723 2.378 20 5.916 20Z"/><path d="M5.914 10.75h8.172a.75.75 0 0 0 0-1.5H5.914a.75.75 0 0 0 0 1.5Z"/><path d="M9.678 14.498a.75.75 0 0 0 .529-1.281L6.977 10l3.23-3.217a.75.75 0 0 0-1.058-1.062L5.385 9.47a.746.746 0 0 0 0 1.062l3.764 3.748a.747.747 0 0 0 .529.22Z"/></g></svg>
`

    return (
        <SvgXml width={width} height={height} xml={svgCross}/>
    )
}

export default BackIconSvg;