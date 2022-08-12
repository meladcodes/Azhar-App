import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Feather from "react-native-vector-icons/Feather";
import { TouchableOpacity, View } from 'react-native';
import COLORS from '../constants/COLORS';
import HomeScreen from '../Screens/HomeScreen';
import AskDua from '../Screens/AskDua';
import MyProfileScreen from '../Screens/MyProfileScreen';

const Tab = createBottomTabNavigator();

const Tabs = ({navigation}) => {
  const customTabBarStyle = {
    tabBarActiveTintColor: COLORS.primary,
    inactiveTintColor: 'black',
    tabBarStyle: {backgroundColor: COLORS.white, borderTopLeftRadius: 20,borderTopRightRadius: 20, position: "absolute"},
    tabBarShowLabel: false,
    headerShown: false,
}

  return (
    <Tab.Navigator screenOptions={customTabBarStyle}>
    <Tab.Screen name='HomeScreen' component={HomeScreen} options={{
      tabBarIcon: ({color}) => (
        <Feather name='home' size={26} color={color}/>
      )
    }}/>
    <Tab.Screen name='AskDua' component={AskDua} options={{
      tabBarIcon: ({color, focused}) => (
        <TouchableOpacity onPress={() => navigation.navigate("AskDua")}
            style={{
                position: 'absolute',
                bottom: 15, // space from bottombar
                height: 68,
                width: 68,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: COLORS.primary,
                borderRadius: 34,
            }}
            >
        <Feather name='plus' size={26} color={"white"}/>
        </TouchableOpacity>
      )
    }}/>
    <Tab.Screen name='MyProfileScreen' component={MyProfileScreen} options={{
      tabBarIcon: ({color}) => (
        <Feather name='user' size={26} color={color}/>
      )
    }}/>
  </Tab.Navigator>
  )
}

export default Tabs;