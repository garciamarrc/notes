import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Icon } from "@rneui/base";

import Home from "../screens/Home";
import NewNote from "../screens/NewNote";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  const screenOptions = (route, color) => {
    let iconName;

    switch (route.name) {
      case "Home":
        iconName = "note-multiple";
        break;
      case "NewNote":
        iconName = "plus";
        break;
    }

    return (
      <Icon type="material-community" name={iconName} size={22} color={color} />
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenOptions(route, color),
        })}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{ title: "Mis notas" }}
        />
        <Tab.Screen
          name="NewNote"
          component={NewNote}
          options={{ title: "Nueva nota" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
