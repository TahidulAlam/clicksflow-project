import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdmingenMessageState {
  genMessages: string[];
}

const initialState: AdmingenMessageState = {
  genMessages: [],
};

const genMessageSlice = createSlice({
  name: "admingenMessage",
  initialState,
  reducers: {
    setgenMessage: (state, action: PayloadAction<string>) => {
      const genMessage = action.payload;
      if (!state.genMessages.includes(genMessage)) {
        state.genMessages.push(genMessage);
      } else {
        state.genMessages = state.genMessages.filter(
          (msg) => msg !== genMessage
        );
      }
    },
    removegenMessage: (state, action: PayloadAction<string>) => {
      state.genMessages = state.genMessages.filter(
        (msg) => msg !== action.payload
      );
    },
    clearAllgenMessages: (state) => {
      state.genMessages = [];
    },
  },
});

export const { setgenMessage, removegenMessage, clearAllgenMessages } =
  genMessageSlice.actions;
export default genMessageSlice.reducer;
