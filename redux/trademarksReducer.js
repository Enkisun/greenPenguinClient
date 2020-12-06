import { createSlice } from '@reduxjs/toolkit';

const trademarksSlice = createSlice({
  name: 'trademarks',
  initialState: {
    trademarks: [],
    trademarkFilter: [],
  },
  reducers: {
    addTrademark: (state, action) => {
      state.trademarks = [...state.trademarks, action.payload]
    },
    deleteTrademarks: state => {
      state.trademarks = [];
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

export const { addTrademark, deleteTrademarks, addTrademarkFilter, removeTrademarkFilter, removeTrademarkFilters } = trademarksSlice.actions

export const getTrademarksTC = () => async dispatch => {
  await dispatch(deleteTrademarks());

  const response = await fetch(`http://localhost:5000/api/trademarks`);
  if (!response.ok) throw Error(response.statusText);
  const json = await response.json();

  if (json) {
    await Promise.all(json.trademarks.map(async trademark => await dispatch(addTrademark(trademark)) ));
  }
};

const trademarksReducer = trademarksSlice.reducer

export default trademarksReducer;