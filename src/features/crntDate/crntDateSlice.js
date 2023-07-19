import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

export const crntDateSlice = createSlice({
  name: "crntDate",
  initialState: dayjs(),
  reducers: {
    setDate(state, action) {
      state = action.payload;
    },
  },
});

export const { setDate } = crntDateSlice.actions;
export default crntDateSlice.reducers;
