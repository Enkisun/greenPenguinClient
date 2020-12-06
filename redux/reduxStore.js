import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import productsReducer from './productsReducer';
import categoriesReducer from './categoriesReducer';
import trademarksReducer from './trademarksReducer';
import basketReducer from './basketReducer';

const store = configureStore({
  reducer: { productsReducer, categoriesReducer, trademarksReducer, basketReducer },
  middleware: [...getDefaultMiddleware()],
  devTools: true,
});

export default store;