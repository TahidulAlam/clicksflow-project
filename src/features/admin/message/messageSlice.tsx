import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdminMessageState {
  messages: string[];
}

const initialState: AdminMessageState = {
  messages: [],
};

const messageSlice = createSlice({
  name: "adminMessage",
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<string>) => {
      const message = action.payload;
      if (!state.messages.includes(message)) {
        state.messages.push(message);
      } else {
        state.messages = state.messages.filter((msg) => msg !== message);
      }
    },
    removeMessage: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter((msg) => msg !== action.payload);
    },
    clearAllMessages: (state) => {
      state.messages = [];
    },
  },
});

export const { setMessage, removeMessage, clearAllMessages } =
  messageSlice.actions;
export default messageSlice.reducer;
