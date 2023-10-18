// import React, { useEffect } from 'react';
// import { Alert } from 'react-native';
// import VersionCheck from 'react-native-version-check';

// const UpdateChecker = () => {
//   useEffect(() => {
//     checkForUpdate();
//   }, []);

//   const checkForUpdate = async () => {
//     const latestVersion = await VersionCheck.needUpdate();

//     if (latestVersion.isNeeded) {
//       Alert.alert(
//         'Update Required',
//         `A new version (${latestVersion.currentVersion}) is available. Please update the app for the best experience.`,
//         [
//           {
//             text: 'Update Now',
//             onPress: () => {
//               VersionCheck.needUpdateOrNot({
//                 iosAppId: 'YOUR_IOS_APP_ID',
//                 appName: 'YOUR_APP_NAME',
//               });
//             },
//           },
//         ],
//         { cancelable: false }
//       );
//     }
//   };

//   return null;
// };

// export default UpdateChecker;