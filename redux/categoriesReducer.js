import { createSlice } from '@reduxjs/toolkit';

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    categoryFilter: '',
    subcategoryFilter: '',
  },
  reducers: {
    addCategory: (state, action) => {
      state.categories = [...state.categories, action.payload]
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
  }
})

export const { addCategory, deleteCategories, setCategoryFilter, setSubcategoryFilter } = categoriesSlice.actions

export const getCategoriesTC = () => async dispatch => {
  await dispatch(deleteCategories());

  const response = await fetch(`http://localhost:5000/api/categories`);
  if (!response.ok) throw Error(response.statusText);
  const json = await response.json();

  if (json) {
    await Promise.all(json.categories.map(async category => await dispatch(addCategory(category)) ));
  }
};

const categoriesReducer = categoriesSlice.reducer

export default categoriesReducer;