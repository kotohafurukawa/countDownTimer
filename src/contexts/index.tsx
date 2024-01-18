import { useReducer, createContext, Dispatch, ReactNode } from "react";
// 型定義
type initialStatesType = {
  timerValue: number;
  startTime: number;
  isRunning: boolean;
  minuteInputValue: string;
  secondInputValue: string;
};
type ACTIONTYPE =
  | { type: "DECREMENT"; payload: 1 }
  | { type: "START_TIMER"; payload: number }
  | { type: "TOGGLE_IS_RUNNING" }
  | { type: "SET_INPUT_MINUTE"; payload: string }
  | { type: "SET_INPUT_SECOND"; payload: string }
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
  timerValue: 0,
  startTime: 0,
  isRunning: false,
  minuteInputValue: "",
  secondInputValue: "",
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
    case "START_TIMER":
      return {
        ...state,
        timerValue: action.payload,
        startTime: action.payload,
        isRunning: true,
      };
    case "TOGGLE_IS_RUNNING":
      return { ...state, isRunning: !state.isRunning };
    case "SET_INPUT_MINUTE":
      return { ...state, minuteInputValue: action.payload };
    case "SET_INPUT_SECOND":
      return { ...state, secondInputValue: action.payload };
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
