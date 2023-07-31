import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

export const crntDateSlice = createSlice({
  name: "crntDate",
  initialState: {
    value: dayjs().format("YYYY-MM-DD"),
  },
  reducers: {
    setDate(state, action) {
      state.value = action.payload;
    },
  },
});

export const { setDate } = crntDateSlice.actions;
export default crntDateSlice.reducer;
