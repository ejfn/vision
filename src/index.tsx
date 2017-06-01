import { NavigationContainer, StackNavigator } from 'react-navigation';

import { PhotoView } from './components/PhotoView';
import { SelectView } from './components/SelectView';

// tslint:disable-next-line:variable-name
export const App: NavigationContainer = StackNavigator({
    Select: { screen: SelectView },
    Photo: { screen: PhotoView }
});
