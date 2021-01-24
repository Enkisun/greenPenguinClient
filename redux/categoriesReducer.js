import { createSlice } from '@reduxjs/toolkit'

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    categoryFilter: '',
    subcategoryFilter: '',
    trademarkFilter: [],
  },
  reducers: {
    addCategories: (state, action) => {
      state.categories = action.payload;
    },
    deleteCategories: state => {
      state.categories = [];
    },
    setCategoryFilter: (state, action) => {
      state.categoryFilter = action.payload;
    },
    setSubcategoryFilter: (state, action) => {
      state.subcategoryFilter = action.payload;
    },
    addTrademarkFilter: (state, action) => {
      state.trademarkFilter = [...state.trademarkFilter, action.payload]
    },
    removeTrademarkFilter: (state, action) => {
      state.trademarkFilter = state.trademarkFilter.filter(trademark => {
        if (trademark !== action.payload) return trademark;
      })
    },
    removeTrademarkFilters: state => {
      state.trademarkFilter = [];
    },
  }
})

export const getCategories = () => async dispatch => {
  await dispatch(deleteCategories());

  try {
    const response = await fetch(`//localhost:5000/categories`);
    
    const json = await response.json();

    if (json) {
      await dispatch(addCategories(json.categories));
    }
  } catch(e) {
    console.log(e.message);
  }
};

export const { addCategories, deleteCategories, setCategoryFilter, setSubcategoryFilter,
  addTrademarkFilter, removeTrademarkFilter, removeTrademarkFilters } = categoriesSlice.actions

export default categoriesSlice.reducer;