import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { AppointmentProps } from '../components/Appointments';
import { theme } from '../global/styles/theme';
import { AppointmentCreate } from '../screens/AppointmentCreate';
import { AppointmentDetails } from '../screens/AppointmentDetails';
import { Home } from '../screens/Home';

export type IStackRoutesList = {
  Home: undefined;
  AppointmentCreate: undefined;
  AppointmentDetails: { guildSelected: AppointmentProps };
  Guilds: undefined;
  SignIn: undefined;
};

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: theme.colors.secondary100 },
      }}
    >
      <Screen
        name="Home"
        component={Home}
      />
      <Screen
        name="AppointmentDetails"
        component={AppointmentDetails}
      />
      <Screen
        name="AppointmentCreate"
        component={AppointmentCreate}
      />
    </Navigator>
  );
}
