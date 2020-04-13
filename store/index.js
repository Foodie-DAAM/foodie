import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';

import authReducer from './authSlice';
import counterReducer from './counterSlice';
import ingredientsReducer from './ingredientsSlice';
import likedReducer from './likedSlice';

// TODO: use SecureStore (https://docs.expo.io/versions/latest/sdk/securestore/) for user data

export const store = configureStore({
	middleware: getDefaultMiddleware({ serializableCheck: false }),
	reducer: {
		auth:        persistReducer({ key: 'auth',        storage: AsyncStorage }, authReducer),
		counter:     persistReducer({ key: 'counter',     storage: AsyncStorage }, counterReducer),
		liked:       persistReducer({ key: 'liked',       storage: AsyncStorage }, likedReducer),
		ingredients: persistReducer({ key: 'ingredients', storage: AsyncStorage }, ingredientsReducer),
	}
});

export const persistor = persistStore(store);