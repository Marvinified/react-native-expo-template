import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { UserProvider, withAuth } from "./context/auth";
import routes from "./routes";

const Stack = createStackNavigator();

const Router = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {props.auth.isSignedIn
        ? routes.protected.map(({ title, component: Component, options }) => (
            <Stack.Screen name={title} component={withAuth(Component)} />
          ))
        : routes.public.map(({ title, component: Component, options }) => (
            <Stack.Screen name={title} component={withAuth(Component)} />
          ))}
    </Stack.Navigator>
  );
};

const RouterWithAuth = withAuth(Router);

export default function App() {
  return (
    <NavigationContainer>
      <UserProvider>
        <RouterWithAuth />
      </UserProvider>
    </NavigationContainer>
  );
}