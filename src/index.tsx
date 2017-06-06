import { Asset } from 'expo';
import { NavigationContainer, StackNavigator } from 'react-navigation';

import { MainScreen } from './components/MainScreen';
import { PhotoScreen } from './components/PhotoScreen';

// tslint:disable:no-require-imports no-var-requires
Asset.fromModule(require('../assets/emotions/anger.png')).downloadAsync();
Asset.fromModule(require('../assets/emotions/contempt.png')).downloadAsync();
Asset.fromModule(require('../assets/emotions/disgust.png')).downloadAsync();
Asset.fromModule(require('../assets/emotions/fear.png')).downloadAsync();
Asset.fromModule(require('../assets/emotions/happiness.png')).downloadAsync();
Asset.fromModule(require('../assets/emotions/neutral.png')).downloadAsync();
Asset.fromModule(require('../assets/emotions/sadness.png')).downloadAsync();
Asset.fromModule(require('../assets/emotions/surprise.png')).downloadAsync();
// tslint:enable:no-require-imports no-var-requires

// tslint:disable-next-line:variable-name
export const App: NavigationContainer = StackNavigator({
    Main: { screen: MainScreen },
    Photo: { screen: PhotoScreen }
});
