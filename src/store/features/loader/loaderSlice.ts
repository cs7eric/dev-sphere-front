import { createSlice } from '@reduxjs/toolkit';

interface LoaderState {
  isLoading: boolean;
}

const initialState: LoaderState = {
  isLoading: false,
};

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    showLoader: (state) => {
      state.isLoading = true;
    },
    hideLoader: (state) => {
      state.isLoading = false;
    },
  },
});

export const { showLoader, hideLoader } = loaderSlice.actions;

// 选择器，用于从状态中获取isLoading值
export const selectLoading = (state: { loader: LoaderState }) => state.loader.isLoading;

export default loaderSlice.reducer;