import dayjs from "dayjs";
import {
  selectFinanceForDate,
  selectFinanceForWeek,
  useGetFinanceForMonthQuery,
} from "../features/finance/financeSlice";
import { useDispatch } from "react-redux";
import { setDate } from "../features/crntDate/crntDateSlice";

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
      <h1>{date.month() + 1}</h1>
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

  const { financeForWeek } = useGetFinanceForMonthQuery(
    { date: date.format("YYYYMM") },
    {
      selectFromResult: (result) => ({
        ...result,
        financeForWeek: selectFinanceForWeek(result, numWeek),
      }),
    }
  );

  const weekExpense = financeForWeek
    .map((x) => x.expense)
    .reduce((a, b) => a + b, 0);

  const weekIncome = financeForWeek
    .map((x) => x.income)
    .reduce((a, b) => a + b, 0);

  return (
    <div>
      <div>
        {weekExpense !== 0 && `-${weekExpense}`}
        {weekIncome !== 0 && `+${weekIncome}`}
      </div>
      {dayChild}
    </div>
  );
};

export const Day = (props) => {
  const { date } = props;
  const dispatch = useDispatch();

  const {
    financeForDate: { expense, income },
  } = useGetFinanceForMonthQuery(
    { date: date.format("YYYYMM") },
    {
      selectFromResult: (result) => ({
        ...result,
        financeForDate: selectFinanceForDate(result, date),
      }),
    }
  );

  const handleClick = () => {
    dispatch(setDate(date.format("YYYY-MM-DD")));
  };
  return (
    <span>
      <div
        style={{
          border: "1px solid black",
          width: 100,
          display: "inline-block",
        }}
        onClick={handleClick}
      >
        <div>{date.date()}</div>
        <div>지출: -{expense}</div>
        <div>수입: +{income}</div>
      </div>
    </span>
  );
};
