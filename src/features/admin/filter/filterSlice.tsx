import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterItem {
  category: string;
  value: string;
}

interface FilterState {
  filters: Record<string, FilterItem>;
}

const initialState: FilterState = {
  filters: {},
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterItem>) => {
      const { category, value } = action.payload;
      const key = `${category}:${value}`;
      if (!state.filters[key]) {
        state.filters[key] = { category, value };
      } else {
        delete state.filters[key];
      }
    },
    removeFilter: (state, action: PayloadAction<FilterItem>) => {
      const { category, value } = action.payload;
      const key = `${category}:${value}`;
      delete state.filters[key];
    },
    clearAllFilters: (state) => {
      state.filters = {};
    },
  },
});

export const { setFilter, removeFilter, clearAllFilters } = filterSlice.actions;
export default filterSlice.reducer;
