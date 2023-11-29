import { PERMISSIONS } from "react-native-permissions";

export async function getCameraPermissions() {
    const granted = await request(
      Platform.select({
        android: PERMISSIONS.ANDROID.CAMERA,
        ios: PERMISSIONS.IOS.CAMERA,
      }),
    );
  
    return granted === RESULTS.GRANTED;
  }