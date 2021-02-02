import React, { useEffect, createContext, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = createContext();

export const withAuth = (Component) => (props) => {
  const value = useContext(UserContext);

  console.log({value})
  return <Component {...props} {...value} />;
};

export const UserProvider = ({ children }) => {
  const [auth, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            token: action.token,
            isLoading: false,
            isSignedIn: true,
          };
        case "LOG_IN":
          return {
            ...prevState,
            isSignedIn: true,
            token: action.token,
            user: action.user,
          };
        case "LOG_OUT":
          return {
            ...prevState,
            isSignedIn: false,
            token: null,
            user: null,
          };
      }
    },
    {
      isLoading: true,
      isSignedIn: false,
      token: null,
      user: null,
    }
  );

  const dispatches = React.useMemo(
    () => ({
      login: async (data) => {
        // Todo
        await AsyncStorage.setItem("auth:token", "dummy-auth-token");
        dispatch({ type: "LOG_IN", token: "dummy-auth-token" });
      },
      logout: async () => {
        console.log("Logout")
        await AsyncStorage.removeItem("auth:token");
        dispatch({ type: "LOG_OUT" });
      },
      register: async (data) => {
        // Todo
        await AsyncStorage.setItem("auth:token", "dummy-auth-token");
        dispatch({
          type: "LOG_IN",
          token: "dummy-auth-token",
          user: { name: "A name" },
        });
      },
    }),
    [dispatch]
  );

  // useEffect(() => {
  //   // Fetch the token from storage then navigate to our appropriate place
  //   const checkAuthState = async () => {
  //     let token;
  //     try {
  //       token = await AsyncStorage.getItem("auth:token");
  //       if(token){
  //         dispatch({ type: "RESTORE_TOKEN", token: token });
  //       }
  //     } catch (e) {
  //       // Restoring token failed
  //       dispatch({ type: "LOG_OUT" });
  //     }
  //   };

  //   checkAuthState();
  // }, [dispatch]);

  return (
    <UserContext.Provider value={{ auth, ...dispatches }}>
      {children}
    </UserContext.Provider>
  );
};
