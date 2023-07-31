import { useSelector } from "react-redux";
import { useGetFinanceDetailQuery } from "../features/finance/financeSlice";

export const DayFinanceList = () => {
  // 1. Redux 로 현재 선택 날짜 관리
  // 2. 현재 선택 날짜로부터 쿼리 보내서 해당 날짜의 상세 내역 응답 -> data
  const date = useSelector((state) => state.crntDate.value);
  const { data = [] } = useGetFinanceDetailQuery({ date });
  return (
    <div>
      {data.map((d) => (
        <DayFinanceListItem key={d.id} item={d} />
      ))}
    </div>
  );
};

export const DayFinanceListItem = ({ item }) => {
  return (
    <div>
      <span>
        {item.category} {item.merchant} {item.paymentMethod} {item.amount}
      </span>
    </div>
  );
};
