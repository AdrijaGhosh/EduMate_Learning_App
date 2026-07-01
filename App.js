import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Splash from './screens/Auth/Splash';
import Login from './screens/Auth/Login';
import Signup from './screens/Auth/Signup';
import Main from './screens/Main';
import UserContextProvider from './hooks/UserContextProvider';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <UserContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Splash' component={Splash} />
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='SignUp' component={Signup} />
          <Stack.Screen name='Main' component={Main} />
        </Stack.Navigator>

      </NavigationContainer>

    </UserContextProvider>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
});
