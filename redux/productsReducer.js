import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    currentPage: 1,
    limit: 12,
    totalProductsCount: 0,
    loading: false,
    sortBy: '',
    sortingOrder: '',
    searchValue: '',
  },
  reducers: {
    addProduct: (state, action) => {
      state.products = [...state.products, action.payload]
    },
    deleteProducts: state => {
      state.products = [];
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalProductsCount: (state, action) => {
      state.totalProductsCount = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSortingOrder: (state, action) => {
      state.sortingOrder = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    }
  }
})

const { addProduct, deleteProducts, setTotalProductsCount, setLoading } = productsSlice.actions

const arrayBufferToBase64 = buffer => {
  let binary = '';
  let bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach(b => binary += String.fromCharCode(b));
  return window.btoa(binary);
};

export const getProductsTC = createAsyncThunk('products/getProducts',
  async (endpoint, {dispatch}) => {
    dispatch(setLoading(true));
    dispatch(deleteProducts());

    const response = await fetch(endpoint);

    if (!response.ok) {
      dispatch(setLoading(false));
      throw Error(response.statusText);
    }

    const json = await response.json();
    if (json) {
      dispatch(setTotalProductsCount(json.totalProductsCount.totalProductsCount));
      await Promise.all(json.products.map(async product => {
  
        if (product.image) {
          const base64Flag = `data:${product.image.contentType};base64,`;
          const imageStr = arrayBufferToBase64(product.image.data.data);
          product.image = {src: base64Flag + imageStr, name: product.image.name};
        }
  
        dispatch(addProduct(product));
      }));
    }
    dispatch(setLoading(false));
  }
);

const productsReducer = productsSlice.reducer

export default productsReducer;

export const { setCurrentPage, setSortBy, setSortingOrder, setSearchValue } = productsSlice.actions