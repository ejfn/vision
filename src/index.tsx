import { Amplitude, AppLoading, Asset, Constants } from 'expo';
import * as React from 'react';
import { NetInfo } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as actions from './actions/network';
import { MainScreen } from './components/MainScreen';
import { PhotoScreen } from './components/PhotoScreen';
import { CONFIG } from './config';
import * as reducers from './reducers';
import { INITIAL_STATE } from './reducers/initialState';
import { rootSaga } from './sagas';

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers(reducers);

const store = createStore(
  rootReducer,
  INITIAL_STATE,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

// initialise
NetInfo.addEventListener('connectionChange', () => {
  store.dispatch(actions.checkNetwork(undefined));
});

store.dispatch(actions.checkNetwork(undefined));

Amplitude.initialize(CONFIG.amplitude.apiKey);
Amplitude.setUserId(Constants.deviceId);
Amplitude.setUserProperties({
  appOwnership: Constants.appOwnership,
  appVersion: Constants.manifest.extra.semver
});
// #end initialise

// tslint:disable-next-line:variable-name
const AppNavigator = StackNavigator({
  Main: { screen: MainScreen },
  Photo: { screen: PhotoScreen }
});

interface Props { }

interface State {
  isReady: boolean;
}
export class App extends React.PureComponent<Props, State> {

  public state: State = {
    isReady: false
  };

  public render(): JSX.Element {

    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this.cacheResourcesAsync}
          onFinish={this.finishLoading}
          onError={console.warn}
        />
      );
    }

    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }

  private finishLoading = () => {
    this.setState((state: State) => {
      return {
        ...state,
        isReady: true
      };
    });
  }

  private cacheResourcesAsync = async () => {
    const images = [
      // tslint:disable:no-require-imports
      require('../assets/emotions/anger.png'),
      require('../assets/emotions/contempt.png'),
      require('../assets/emotions/disgust.png'),
      require('../assets/emotions/fear.png'),
      require('../assets/emotions/happiness.png'),
      require('../assets/emotions/neutral.png'),
      require('../assets/emotions/sadness.png'),
      require('../assets/emotions/surprise.png'),
      require('../assets/christmas-banner.jpg')
      // tslint:enable:no-require-imports
    ];

    const cacheImages = images.map(async (img) => Asset.fromModule(img).downloadAsync());
    await Promise.all([...cacheImages]);
  }
}
