import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getProducts = createAsyncThunk('products/getProducts',
  async (currentPage, limit, category, subcategory, trademark, sortBy, sortingOrder, searchValue) => {
    let productsURI = `//localhost:5000/products?page=${currentPage}&limit=${limit}`;
    console.log(currentPage, limit, category, subcategory, trademark, sortBy, sortingOrder, searchValue)
    if (category) {
      productsURI += `&category=${category}`;
    }
  
    if (subcategory) {
      productsURI += `&subcategory=${subcategory}`;
    }
  
    if (trademark?.length) {
      productsURI += `&trademark=${trademark}`;
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
  }
);

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
    addProducts: (state, action) => {
      state.products = action.payload;
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
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.loading = true
    },
    [getProducts.fulfilled]: (state, action) => {
      state.totalProductsCount = action.payload.totalProductsCount.totalProductsCount
      state.products = action.payload.products
      state.loading = false
    },
    [getProducts.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error
    }
  }
})

export const { addProducts, deleteProducts, setTotalProductsCount, setLoading,
  setCurrentPage, setSortBy, setSortingOrder, setSearchValue } = productsSlice.actions

export default productsSlice.reducer;