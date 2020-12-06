import { createSlice } from '@reduxjs/toolkit';

const basketSlice = createSlice({
  name: 'basket',
  initialState: {
    basketProducts: [],
    totalPrice: 0,
    productsCount: [],
  },
  reducers: {
    addBasketProduct: (state, action) => {
      state.basketProducts.push(action.payload)
    },
    setTotalPrice: (state, action) => {
      console.log(parseFloat(state.totalPrice) + parseFloat(action.payload))
      state.totalPrice = (parseFloat(state.totalPrice) + parseFloat(action.payload)).toFixed(2);
    },
    addProductCount: (state, action) => {
      state.productsCount = [...state.productsCount, action.payload];
    },
    setProductCount: (state, action) => {
      state.productsCount = state.productsCount.map(product => {
        if (product.id === action.payload.id) return {...product, count: action.payload.count}
        else return product;
      });
    },
    deleteBasketProduct: (state, action) => {
      state.basketProducts = state.basketProducts.filter(product => {
        if (product._id !== action.payload._id) return product
      });
    },
    deleteProductCount: (state, action) => {
      state.productsCount = state.productsCount.filter(product => {
        if (product.id !== action.payload._id) return product
      });
    },
  }
});

export const { addBasketProduct, setTotalPrice, addProductCount, setProductCount, deleteBasketProduct, deleteProductCount } = basketSlice.actions

const basketReducer = basketSlice.reducer

export default basketReducer;