import { createSlice } from "@reduxjs/toolkit";

const ItemSlice = createSlice({
  name: 'item',
  initialState: {
    loading: false,
     items:'',
    error: false,
  },
  reducers: {
    getItemStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getItems:(state,action)=>{
      state.loading=false;
      state.items=action.payload
    },
  
  
    getItemError: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { getItemStart,  getItems, getItemError } = ItemSlice.actions;

export default ItemSlice.reducer;