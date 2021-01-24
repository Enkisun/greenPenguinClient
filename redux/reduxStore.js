import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import productsReducer from './productsReducer'
import categoriesReducer from './categoriesReducer'
import basketReducer from './basketReducer'

const store = configureStore({
  reducer: { 
    products: productsReducer,
    categories: categoriesReducer,
    basket: basketReducer 
  },
  middleware: [...getDefaultMiddleware()],
  devTools: true,
});

export default store;