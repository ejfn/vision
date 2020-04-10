import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as NetInfo from '@react-native-community/netinfo';
import MainScreen from './components/MainScreen';
import PhotoScreen from './components/PhotoScreen';
import { EMOJI_ICONS } from './constants';
import * as reducers from './reducers';
import INITIAL_STATE from './reducers/initialState';
import { rootSaga } from './sagas';
import * as actions from './actions/network';

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers(reducers);

const store = createStore(
  rootReducer,
  INITIAL_STATE,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

const AppContainer = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Photo"
          component={PhotoScreen}
          options={{
            // title: `${props.navigation.state.params && props.navigation.state.params.title}`,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  const [isReady, setReady] = useState(false);

  const startAsync = async () => {
    // initialise
    NetInfo.addEventListener(() => {
      store.dispatch(actions.checkNetwork(undefined));
    });
    store.dispatch(actions.checkNetwork(undefined));

    // cache images
    const images = [
      ...Object.values(EMOJI_ICONS),
    ];
    const cacheImages = images.map(async (img) => Asset.fromModule(img)
      .downloadAsync());
    await Promise.all([...cacheImages]);
  };

  const finishLoading = () => {
    setReady(true);
  };

  return isReady
    ? (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    ) : (
      <AppLoading
        startAsync={startAsync}
        onFinish={finishLoading}
      />
    );
}
