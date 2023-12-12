import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SupportScreen from '../screens/profile/SupportScreen';
import LoginScreen from '../LoginScreen';
import WebViewScreen from '../WebViewScreen';

const Stack = createNativeStackNavigator();

const AppRouter = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false }}
                name="support"
                component={SupportScreen}
            />
             <Stack.Screen
                options={{ headerShown: false }}
                name="login"
                component={LoginScreen}
            />
              <Stack.Screen
                options={{ headerShown: false }}
                name="WebViewScreen"
                component={WebViewScreen}
            />
        </Stack.Navigator>
    );
};

export default AppRouter;
