import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createSwitchNavigator } from '@react-navigation/compat';

import Main from './pages/Main';

const SwitchNavigator = createSwitchNavigator({ Main });

export default function Routes() {
    return (
        <NavigationContainer>
            <SwitchNavigator />
        </NavigationContainer>
    );
}
