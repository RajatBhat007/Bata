import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SupportScreen from '../screens/profile/SupportScreen';

const Stack = createNativeStackNavigator();

const AppRouter = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false }}
                name="support"
                component={SupportScreen}
            />
        </Stack.Navigator>
    );
};

export default AppRouter;
