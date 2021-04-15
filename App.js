import React, { useEffect } from "react";
import { Image, View, Alert, ToastAndroid } from "react-native";

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
import ListUser from './src/screens/ListUser'
import AcceptMatch from './src/screens/AcceptMatch'
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StadiumLocation from "./src/screens/stadiumLocation";
import MyRequest from "./src/screens/MyRequest";

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
    <Stack.Screen
      name="ListUser"
      component={ListUser}
      options={{
        animationEnabled: false
      }}
    />
    <Stack.Screen
      name="AcceptMatch"
      component={AcceptMatch}
      options={{
        animationEnabled: false
      }}
    />
    <Stack.Screen 
      name="stadiumLocation"
      component={StadiumLocation}
      options={{
        animationEnabled: false
      }}
    />

    <Stack.Screen 
      name="MyRequest"
      component={MyRequest}
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
  const [userToken, setUserToken] = React.useState(false);
  const [confirm, setConfirm] = React.useState(null);
  const [googleUser, setGoogleUser] = React.useState(null)

  useEffect(() => {
    getCurrentUser()
  }, [])

  const getCurrentUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    setGoogleUser(currentUser)
  };
  const updateUserStatus = () => {
    if ((auth().currentUser && auth().currentUser.email && auth().currentUser.displayName) || (googleUser?.user.name && googleUser?.user.email)) {
      setUserToken(true)
    } else if (!auth().currentUser) {
      if (!Constants.DUMMY_AUTH) {
        setUserToken(false);
      }
    }
  }

  auth().onAuthStateChanged(() => {
    updateUserStatus();
  })

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(updateUserStatus);
    return subscriber; // unsubscribe on unmount
  }, []);

  const authContext = React.useMemo(() => {
    return {

      createUser: async (email, password, callback) => {
        try {
          let response = await auth().createUserWithEmailAndPassword(
            email,
            password
          )
          if (response && response.user) {
            callback()
          }
        } catch (e) {
          console.error(e.message)
        }
        updateUserStatus()
      },
      loginWithEmailPassword: async (email, password, callBackError) => {
        try {
          if (Constants.DUMMY_AUTH) {
            setUserToken(true)
          } else {
            const confirmation = await auth().signInWithEmailAndPassword(email, password)
            setConfirm(confirmation);
          }

        } catch (error) {
          callBackError(error)
          console.log(error);
        }
        updateUserStatus();
      },
      loginWithGoogle: async (name) => {
        try {
          // if (name) {
            updateUserStatus()
            // setUserToken(true)
          // }
        } catch (error) {
        }
        setUserToken(true)
      },
      setEmailPassword: async (email, password) => {
        try {
          await auth().currentUser.updateEmail(email);
          await auth().currentUser.updatePassword(password);
        } catch (error) {
          throw error;
        }
        updateUserStatus();
      },
      setProfileInfo: async (fullName) => {
        try {
          await auth().currentUser.updateProfile({
            displayName: fullName
          });
        } catch (error) {
          throw error;
        }
        updateUserStatus();
      },
      signIn: () => {
        setIsLoading(false);
        setUserToken("asdf");
      },
      signUp: (email, pass) => {
        setIsLoading(false);
        setUserToken("asdf");
      },
      signOut: async () => {
        if (Constants.DUMMY_AUTH) {
          setIsLoading(false);
          setUserToken(null);
        } 
        else if (auth().currentUser) {
          auth()
            .signOut().then(() => {
              ToastAndroid.show("Sign Out", ToastAndroid.SHORT);
              setIsLoading(false);
              setUserToken(null);
            })
            .catch((err) => {
              ToastAndroid.show("Sign Out Failed", ToastAndroid.SHORT);
            })
        } 
        else {
            try {
              // const token = await AsyncStorage.getItem('Token');
              await GoogleSignin.revokeAccess();
              await GoogleSignin.signOut();
              setIsLoading(false);
              setUserToken(null);
              setGoogleUser([])
              // updateUserStatus()
            } catch (error) {
              console.error('Error',error);
            }
          // };
        }

      }
    };
  }, [confirm]);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStack userToken={userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};