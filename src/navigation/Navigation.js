import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Icon } from "@rneui/base";

import MyNotes from "../screens/Home";
import NewNote from "../screens/NewNote";
import Edit from "../screens/Edit";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Home = () => {
  const screenOptions = (route, color) => {
    let iconName;

    switch (route.name) {
      case "MyNotes":
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
    <Tab.Navigator
      initialRouteName="MyNotes"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => screenOptions(route, color),
        headerStyle: { backgroundColor: "#212121" },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: "#212121" }
      })}
    >
      <Tab.Screen
        name="MyNotes"
        component={MyNotes}
        options={{ title: "My notes" }}
      />
      <Tab.Screen
        name="NewNote"
        component={NewNote}
        options={{ title: "New note" }}
      />
    </Tab.Navigator>
  );
};

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: { backgroundColor: "#212121" },
        headerTintColor: "white",
      }}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditNote"
          component={Edit}
          options={{ title: "Edit note" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
