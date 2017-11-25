import { Asset } from 'expo';
import * as React from 'react';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { MainScreen } from './components/MainScreen';
import { PhotoScreen } from './components/PhotoScreen';
import * as reducers from './reducers';
import { INITIAL_STATE } from './reducers/initialState';
import { rootSaga } from './sagas';

// tslint:disable:no-require-imports no-var-requires
Asset.fromModule(require('../assets/emotions/anger.png')).downloadAsync();
Asset.fromModule(require('../assets/emotions/contempt.png')).downloadAsync();
Asset.fromModule(require('../assets/emotions/disgust.png')).downloadAsync();
Asset.fromModule(require('../assets/emotions/fear.png')).downloadAsync();
Asset.fromModule(require('../assets/emotions/happiness.png')).downloadAsync();
Asset.fromModule(require('../assets/emotions/neutral.png')).downloadAsync();
Asset.fromModule(require('../assets/emotions/sadness.png')).downloadAsync();
Asset.fromModule(require('../assets/emotions/surprise.png')).downloadAsync();

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers(reducers);

const store = createStore(
  rootReducer,
  INITIAL_STATE,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

// tslint:disable-next-line:variable-name
const AppNavigator = StackNavigator({
  Main: { screen: MainScreen },
  Photo: { screen: PhotoScreen }
});

export class App extends React.PureComponent {
  public render(): JSX.Element {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
