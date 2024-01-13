import { useContext } from "react";
import { TimerContext } from "./contexts";

function App() {
  const { state, dispatch } = useContext(TimerContext);
  return (
    <div>
      <h1>Hello World</h1>
      {state.inputMinuteValue}
    </div>
  );
}

export default App;
