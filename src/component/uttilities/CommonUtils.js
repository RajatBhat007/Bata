import { checkVersion } from "./check-version";

export {
    checkVersionUpdate
};
const checkVersionUpdate = async () => {
    const res = await checkVersion();
    if (res && res.needsUpdate) {
        if (Platform.OS == 'android') {
            Alert.alert(
                'Info',
                'To use this app, download the latest version',
                [
                    {
                        text: 'Update',
                        onPress: () => {
                            Linking.openURL(res.url);  // open store if update is needed.
                        }
                    }
                ],

                { cancelable: false }
            );
        }
    }
}