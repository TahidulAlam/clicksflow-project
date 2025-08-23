import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface ParterState {
  metrics: Record<string, number>;
}
const initialState: ParterState = {
  metrics: {},
};
const parterSlice = createSlice({
  name: "parterDashboard",
  initialState,
  reducers: {
    setMetrics(state, action: PayloadAction<Record<string, number>>) {
      state.metrics = action.payload;
    },
  },
});

export const { setMetrics } = parterSlice.actions;
export default parterSlice.reducer;
