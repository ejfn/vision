
import { AppLoading, Asset } from 'expo';
import * as React from 'react';
import { NetInfo } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import * as actions from './actions/network';
import { MainScreen } from './components/MainScreen';
import { PhotoScreen } from './components/PhotoScreen';
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

// listen network changes
NetInfo.addEventListener('connectionChange', () => {
  store.dispatch(actions.checkNetwork(undefined));
});

store.dispatch(actions.checkNetwork(undefined));

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
    // tslint:disable:no-require-imports no-floating-promises
    Asset.fromModule(require('../assets/emotions/anger.png')).downloadAsync();
    Asset.fromModule(require('../assets/emotions/contempt.png')).downloadAsync();
    Asset.fromModule(require('../assets/emotions/disgust.png')).downloadAsync();
    Asset.fromModule(require('../assets/emotions/fear.png')).downloadAsync();
    Asset.fromModule(require('../assets/emotions/happiness.png')).downloadAsync();
    Asset.fromModule(require('../assets/emotions/neutral.png')).downloadAsync();
    Asset.fromModule(require('../assets/emotions/sadness.png')).downloadAsync();
    Asset.fromModule(require('../assets/emotions/surprise.png')).downloadAsync();

    Asset.fromModule(require('../assets/christmas-banner.jpg')).downloadAsync();
    // tslint:enable:no-require-imports no-floating-promises
  }
}
