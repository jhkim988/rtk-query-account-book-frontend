import { MonthCalendar } from "./component/MonthCalendar";
import { DayFinanceList } from './component/DayFinanceList';

function App() {
  return (
    <div className="App">
      <MonthCalendar date={"2023-07-01"} />
      <DayFinanceList />
    </div>
  );
}

export default App;
