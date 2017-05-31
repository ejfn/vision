import { NavigationContainer, StackNavigator } from 'react-navigation';

import { ImageView } from './components/ImageView';
import { MainView } from './components/MainView';

// tslint:disable-next-line:variable-name
export const App: NavigationContainer = StackNavigator({
    MainView: { screen: MainView },
    ImageView: { screen: ImageView }
});
