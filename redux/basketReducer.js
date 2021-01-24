import { createSlice } from '@reduxjs/toolkit'

const basketSlice = createSlice({
  name: 'basket',
  initialState: {
    basketProducts: [],
    totalPrice: 0,
  },
  reducers: {
    addBasketProduct: (state, action) => {
      state.basketProducts.push(action.payload);
    },
    changeProductCount: (state, action) => {
      state.basketProducts = state.basketProducts.map(product => {
        if (product.id === action.payload.id) return {...product, count: action.payload.count}
        else return product
      });
    },
    deleteBasketProduct: (state, action) => {
      state.basketProducts = state.basketProducts.filter(product => {
        if (product._id !== action.payload._id) return product
      });
    },
    setTotalPrice: (state, action) => {
      state.totalPrice = (parseFloat(state.totalPrice) + parseFloat(action.payload)).toFixed(2);
    },
  }
});

export const { addBasketProduct, setTotalPrice, deleteBasketProduct, changeProductCount } = basketSlice.actions

export default basketSlice.reducer;