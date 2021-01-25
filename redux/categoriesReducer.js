import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getCategories = createAsyncThunk('categories/getCategories', async () => {
  const response = await fetch(`http://localhost:5000/categories`);
  return (await response.json());
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categoriesData: [],
    activeCategory: '',
    activeSubcategory: '',
    activeTrademarks: [],
  },
  reducers: {
    addCategories: (state, action) => {
      state.categoriesData = action.payload
    },
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    setActiveSubcategory: (state, action) => {
      state.activeSubcategory = action.payload;
    },
    setActiveTrademark: (state, action) => {
      state.activeTrademarks = [...state.activeTrademarks, action.payload]
    },
    removeActiveTrademark: (state, action) => {
      state.activeTrademarks = state.activeTrademarks.filter(trademark => {
        if (trademark !== action.payload) return trademark;
      })
    },
    removeActiveTrademarks: state => {
      state.activeTrademarks = [];
    },
  },
  extraReducers: {
    [getCategories.fulfilled]: (state, action) => {
      state.categoriesData = action.payload.categories
    },
  }
})

export const resetFilters = () => dispatch => {
  dispatch(removeActiveTrademarks());
  dispatch(setActiveCategory(''));
  dispatch(setActiveSubcategory(''));
} 

export const { addCategories, setActiveCategory, setActiveSubcategory,
  setActiveTrademark, removeActiveTrademark, removeActiveTrademarks } = categoriesSlice.actions

export default categoriesSlice.reducer;