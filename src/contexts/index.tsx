import { useReducer, createContext, Dispatch, ReactNode } from "react";
// 型定義
type initialStatesType = {
  timerValue: number;
  startTime: number;
  isRunning: boolean;
  inputMinuteValue: number;
  inputSecondValue: number;
};
type ACTIONTYPE =
  | { type: "DECREMENT"; payload: 1 }
  | { type: "SET_START_TIME"; payload: number }
  | { type: "TOGGLE_IS_RUNNING" }
  | { type: "SET_INPUT_MINUTE"; payload: number }
  | { type: "SET_INPUT_SECOND"; payload: number }
  | { type: "RESET" };
type TimerContextType = {
  state: initialStatesType;
  dispatch: Dispatch<ACTIONTYPE>;
};

/**
 * TimerContextで配信されるstateの初期値
 *
 * timerValue - 現在のカウントダウンの値
 *
 * startTime - タイマーの初期値（プログレスバーの最大値で使用する）
 *
 * isRunning - タイマーの稼働状態判定
 *
 * inputMinuteValue - ユーザ入力値（分）
 *
 * inputSecondValue - ユーザ入力値（秒）
 */
const initialStates: initialStatesType = {
  timerValue: 10,
  startTime: 10,
  isRunning: false,
  inputMinuteValue: 0,
  inputSecondValue: 0,
};
/**
 * TimerContextの更新用関数
 * @param state
 * @param action
 * @returns
 */
const reducer = (
  state: initialStatesType,
  action: ACTIONTYPE
): initialStatesType => {
  switch (action.type) {
    case "DECREMENT":
      return { ...state, timerValue: state.timerValue - action.payload };
    case "SET_START_TIME":
      return { ...state, startTime: action.payload };
    case "TOGGLE_IS_RUNNING":
      return { ...state, isRunning: !state.isRunning };
    case "SET_INPUT_MINUTE":
      return { ...state, inputMinuteValue: action.payload };
    case "SET_INPUT_SECOND":
      return { ...state, inputSecondValue: action.payload };
    case "RESET":
      return { ...state, timerValue: state.startTime, isRunning: false };

    default:
      throw new Error("InValid action type. Check typo, state and action");
  }
};
export const TimerContext = createContext<TimerContextType>({
  state: initialStates,
  dispatch: () => {},
});

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialStates);

  return (
    <TimerContext.Provider value={{ state, dispatch }}>
      {children}
    </TimerContext.Provider>
  );
};
