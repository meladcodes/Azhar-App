import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoardScreen from './Screens/OnBoardScreen';
import RegisterScreen from './Screens/RegisterScreen';
import LoginScreen from './Screens/LoginScreen';
import CreateProfileScreen from "./Screens/CreateProfileScreen";
import Tabs from "./Navigation/Tabs";
import { AuthContextProvider } from './contexts/AuthContext';
import OtherProfileScreen from './Screens/OtherProfileScreen';
import CommentsScreen from './Screens/CommentsScreen';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: Async Storage has been extracted from react-native core']);




const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name='OnBoardScreen' component={OnBoardScreen} options={{gestureEnabled: false}}/>
          <Stack.Screen name='RegisterScreen' component={RegisterScreen}/>        
          <Stack.Screen name='LoginScreen' component={LoginScreen}/>      
          <Stack.Screen name='CreateProfileScreen' component={CreateProfileScreen}/>      
          <Stack.Screen name='OtherProfileScreen' component={OtherProfileScreen}/>      
          <Stack.Screen name='Tabs' component={Tabs} options={{gestureEnabled: false}}/>      
          <Stack.Screen name='CommentsScreen' component={CommentsScreen}/>      
        </Stack.Navigator>
      </AuthContextProvider>
    </NavigationContainer>
  );
}

