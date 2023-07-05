import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { selectFinanceForDate, selectFinanceForWeek, useGetFinanceDetail, useGetFinanceForMonthQuery } from "../features/finance/financeSlice";

dayjs.extend(weekOfYear);

export const MonthCalendar = (props) => {
  const date = dayjs(props.date);
  const start = date.date(1);
  const end = date.endOf("month");
  const numWeek = end.week() - start.week() + 1;

  const weekChild = Array(numWeek)
    .fill()
    .map((_, x) => x + start.week())
    .map((numWeek) => (
      <Week key={`week#${date}#${numWeek}`} numWeek={numWeek} date={date} />
    ));

  return (
    <div>
      <h1>{date.month()}</h1>
      {weekChild}
    </div>
  );
};

export const Week = (props) => {
  const { numWeek, date } = props;
  const dayChild = Array(7)
    .fill()
    .map((_, d) => date.week(numWeek).day(d))
    .map((weekDate) => <Day key={`day#${weekDate}`} date={weekDate} />);
  const { financeForWeek } = useGetFinanceForMonthQuery({ date: date.format("YYYYMM") }, {
    selectFromResult: result => ({
      ...result,
      financeForWeek: selectFinanceForWeek(result, numWeek)
    }),
  });
  const weekExpense = financeForWeek.map(x => x.expense).reduce((a, b) => a + b, 0);
  const weekIncome = financeForWeek.map(x => x.income).reduce((a, b) => a + b, 0);
  return (
    <div>
      <div>{weekExpense !== 0 && `-${weekExpense}`} {weekIncome !== 0 && `+${weekIncome}`}</div>
      {dayChild}
    </div>
  );
};

export const Day = (props) => {
  const { date } = props;
  const { financeForDate: { expense, income }} = useGetFinanceForMonthQuery({ date: date.format("YYYYMM") }, {
    selectFromResult: result => ({
      ...result,
      financeForDate: selectFinanceForDate(result, date),
    })
  });

  return (
    <span>
      <div
        style={{
          border: "1px solid black",
          width: 100,
          display: "inline-block",
        }}
      >
        <div>{date.date()}</div>
        <div>지출: -{expense}</div>
        <div>수입: +{income}</div>
      </div>
    </span>
  );
};
