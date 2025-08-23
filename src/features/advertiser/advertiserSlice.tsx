import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface AdvertiserState {
  metrics: Record<string, number>;
}
const initialState: AdvertiserState = {
  metrics: {},
};
const advertiserSlice = createSlice({
  name: "advertiserDashboard",
  initialState,
  reducers: {
    setMetrics(state, action: PayloadAction<Record<string, number>>) {
      state.metrics = action.payload;
    },
  },
});

export const { setMetrics } = advertiserSlice.actions;
export default advertiserSlice.reducer;
