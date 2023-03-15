import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Loading from "../components/loading";
import Dashboard from "../screens/dashboard";

const RootStack = createStackNavigator();

export const Navigation = () => {
  const defaultOptions = {
    headerLeft: null,
    headerTransparent: true,
    headerTitle: "",
  };

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="Dashboard"
          component={Dashboard}
          options={defaultOptions}
        />
        <RootStack.Screen name="Loading" component={Loading} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
