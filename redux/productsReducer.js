import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getProducts = createAsyncThunk('products/getProducts',
 async ({currentPage, limit, activeCategory, activeSubcategory, activeTrademarks, sortBy, sortingOrder, searchValue}) => {
  let productsURI = `//localhost:5000/products?page=${currentPage}&limit=${limit}`;

  if (activeCategory) {
    productsURI += `&category=${activeCategory}`;
  }

  if (activeSubcategory) {
    productsURI += `&subcategory=${activeSubcategory}`;
  }

  if (activeTrademarks.length) {
    productsURI += `&trademark=${activeTrademarks}`;
  }

  if (sortBy) {
    productsURI += `&sortBy=${sortBy}`;
  }

  if (sortingOrder) {
    productsURI += `&sortingOrder=${sortingOrder}`
  }

  if (searchValue) {
    productsURI += `&search=${searchValue}`
  }

  const response = await fetch(productsURI);
  return (await response.json())
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    productsData: [],
    currentPage: 1,
    limit: 12,
    totalProductsCount: 0,
    loading: false,
    sortBy: '',
    sortingOrder: '',
    searchValue: '',
  },
  reducers: {
    addProducts: (state, action) => {
      state.productsData = action.payload
    },
    deleteProducts: state => {
      state.productsData = [];
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
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.loading = true
    },
    [getProducts.fulfilled]: (state, action) => {
      state.totalProductsCount = action.payload.totalProductsCount
      state.productsData = action.payload.products
      state.loading = false
    },
    [getProducts.rejected]: (state) => {
      state.loading = false
    }
  }
})

export const { addProducts, deleteProducts, setTotalProductsCount, setLoading,
  setCurrentPage, setSortBy, setSortingOrder, setSearchValue } = productsSlice.actions

export default productsSlice.reducer;