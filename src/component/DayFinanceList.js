import { useSelector } from "react-redux";
import { useGetFinanceDetail } from "../features/finance/financeSlice";

const data = [
  {
    id: "fId1",
    category: "커피",
    merchant: "스타벅스",
    paymentMethod: "현금",
    amount: 5000,
  },
  {
    id: "fId2",
    category: "빵",
    merchant: "파리바게트",
    paymentMethod: "카드",
    amount: 7000,
  },
];

export const DayFinanceList = () => {
  // 1. Redux 로 현재 선택 날짜 관리
  // 2. 현재 선택 날짜로부터 쿼리 보내서 해당 날짜의 상세 내역 응답 -> data
  const crntDate = useSelector((state) => state.crntDate);
  const data = useGetFinanceDetail(crntDate);
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
