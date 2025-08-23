import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface AdminState {
    metrics: Record<string, number>;
  }
  const initialState: AdminState = {
    metrics: {},
  };
  const adminSlice = createSlice({
    name: 'adminDashboard',
    initialState,
    reducers: {
      setMetrics(state, action: PayloadAction<Record<string, number>>) {
        state.metrics = action.payload;
      },
    },
  });
  
  export const { setMetrics } = adminSlice.actions;
  export default adminSlice.reducer;