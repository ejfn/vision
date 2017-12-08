import 'expo'
import { Asset } from 'expo';
import { App } from './src/';

Asset.fromModule(require('./assets/emotions/anger.png')).downloadAsync();
Asset.fromModule(require('./assets/emotions/contempt.png')).downloadAsync();
Asset.fromModule(require('./assets/emotions/disgust.png')).downloadAsync();
Asset.fromModule(require('./assets/emotions/fear.png')).downloadAsync();
Asset.fromModule(require('./assets/emotions/happiness.png')).downloadAsync();
Asset.fromModule(require('./assets/emotions/neutral.png')).downloadAsync();
Asset.fromModule(require('./assets/emotions/sadness.png')).downloadAsync();
Asset.fromModule(require('./assets/emotions/surprise.png')).downloadAsync();

Asset.fromModule(require('./assets/christmas-banner.jpg')).downloadAsync();

export default App;
