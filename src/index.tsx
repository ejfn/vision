import { NavigationContainer, StackNavigator } from 'react-navigation';

import { MainScreen } from './components/MainScreen';
import { PhotoScreen } from './components/PhotoScreen';

// tslint:disable-next-line:variable-name
export const App: NavigationContainer = StackNavigator({
    Main: { screen: MainScreen },
    Photo: { screen: PhotoScreen }
});
