import dayjs from "dayjs";
import { createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

export const financeSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFinanceForMonth: builder.query({
      query: ({ date }) => `/finance/month/${date}`,
    }),
    getFinanceDetail: builder.query({
      query: ({ date }) => `/finance/day/${date}`,
    }),
  }),
});

export const { useGetFinanceForMonthQuery, useGetFinanceDetailQuery } =
  financeSlice;

export const selectFinanceForMonth =
  financeSlice.endpoints.getFinanceForMonth.select();

export const selectFinanceForWeek = createSelector(
  (res) => res.data,
  (res, weekNum) => weekNum,
  (res, weekNum) =>
    res?.filter((finance) => dayjs(finance.date).week() === weekNum) ?? []
);

const initDateExpenseIncome = { expense: 0, income: 0 };
export const selectFinanceForDate = createSelector(
  (res) => res.data,
  (res, date) => date,
  (res, date) =>
    res?.find((finance) => dayjs(finance.date).isSame(date)) ??
    initDateExpenseIncome
);
