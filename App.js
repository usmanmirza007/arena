import React, { useEffect } from "react";
import { Image, View, ToastAndroid } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import auth from '@react-native-firebase/auth';

import { AuthContext } from "./src/screens/Context";
import Welcome from "./src/screens/Welcome";
import CreateAccount from "./src/screens/CreateAccount";
import HomeScreen from "./src/screens/HomeScreen";
import Login from "./src/screens/Login";
import Constants from './src/constants/index';
import Map from './src/screens/Map'
import Schedule from './src/screens/Schedule'
import Searching from './src/screens/Searching'

const Stack = createStackNavigator();


const AuthStack = () => (
  <Stack.Navigator initialRouteName={'Welcome'} headerMode={'none'}>
    <Stack.Screen
      name="Welcome"
      component={Welcome}
      options={{
        animationEnabled: false
      }}
    />
    <Stack.Screen
      name="CreateAccount"
      component={CreateAccount}
      options={{
        animationEnabled: false
      }}
    />
    <Stack.Screen
      name="Login"
      component={Login}
    />

  </Stack.Navigator>
);

const HomeStack = () => (
  <Stack.Navigator initialRouteName="HomeScreen" headerMode='none' >
   
    <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{
        animationEnabled: false
      }}
    />
    <Stack.Screen
      name="Map"
      component={Map}
      options={{
        animationEnabled: false
      }}
    />
    <Stack.Screen
      name="Schedule"
      component={Schedule}
      options={{
        animationEnabled: false
      }}
    />
    <Stack.Screen
      name="Searching"
      component={Searching}
      options={{
        animationEnabled: false
      }}
    />

  </Stack.Navigator>
);


const RootStack = ({ userToken }) => (
  <Stack.Navigator headerMode="none">
    {userToken ? (
      <Stack.Screen
        name="App"
        component={HomeStack}
        options={{
          animationEnabled: false
        }}
      />) : (
      <Stack.Screen
        name="Auth"
        component={AuthStack}
        options={{
          animationEnabled: false
        }}
      />
    )}
  </Stack.Navigator>
);

export default () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(true);
  const [confirm, setConfirm] = React.useState(null);

  // const updateUserStatus = () => {
  //   if (auth().currentUser && auth().currentUser.email && auth().currentUser.displayName) {
  //     setUserToken(true)
  //   } else if (!auth().currentUser) {
  //     if (!Constants.DUMMY_AUTH) {
  //       setUserToken(false);
  //     }
  //   }
  // }

  // auth().onAuthStateChanged(() => {
  //   updateUserStatus();
  // })

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(updateUserStatus);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  // const authContext = React.useMemo(() => {
  //   return {
  //     sendOtp: async (phoneNumber, callback) => {
  //       if (Constants.DUMMY_AUTH) {
  //         callback();
  //       } else {
  //         const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
  //         setConfirm(confirmation);
  //         callback();
  //       }

  //     },
  //     confirmCode: async (code) => {
  //       try {
  //         if (Constants.DUMMY_AUTH) {
  //           setUserToken(true)
  //         } else {
  //           await confirm.confirm(code);
  //         }

  //       } catch (error) {
  //         ToastAndroid.show("Please sign up first", ToastAndroid.SHORT);
  //         throw new Error("Invalid code.")
  //       }
  //     },
  //     loginWithEmailPassword: async (email, password, callBackError) => {
  //       try {
  //         if (Constants.DUMMY_AUTH) {
  //           setUserToken(true)
  //         } else {
  //           const confirmation = await auth().signInWithEmailAndPassword(email, password)
  //           setConfirm(confirmation);
  //         }

  //       } catch (error) {
  //         callBackError(error)
  //         console.log(error);
  //       }
  //       updateUserStatus();
  //     },
  //     setEmailPassword: async (email, password) => {
  //       try {
  //         await auth().currentUser.updateEmail(email);
  //         await auth().currentUser.updatePassword(password);
  //       } catch (error) {
  //         throw error;
  //       }
  //       updateUserStatus();
  //     },
  //     setProfileInfo: async (fullName) => {
  //       try {
  //         await auth().currentUser.updateProfile({
  //           displayName: fullName
  //         });
  //       } catch (error) {
  //         throw error;
  //       }
  //       updateUserStatus();
  //     },
  //     signIn: () => {
  //       setIsLoading(false);
  //       setUserToken("asdf");
  //     },
  //     signUp: (email, pass) => {
  //       setIsLoading(false);
  //       setUserToken("asdf");
  //     },
  //     signOut: () => {
  //       if (Constants.DUMMY_AUTH) {
  //         setIsLoading(false);
  //         setUserToken(null);
  //       } else {
  //         auth()
  //           .signOut().then(() => {
  //             ToastAndroid.show("Sign Out", ToastAndroid.SHORT);
  //             setIsLoading(false);
  //             setUserToken(null);
  //           })
  //           .catch((err) => {
  //             ToastAndroid.show("Sign Out Failed", ToastAndroid.SHORT);
  //           })
  //       }

  //     }
  //   };
  // }, [confirm]);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    // <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStack userToken={userToken} />
      </NavigationContainer>
    // </AuthContext.Provider>
  );
};