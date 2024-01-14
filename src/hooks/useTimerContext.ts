import { useContext } from "react";
import { TimerContext } from "../contexts";

/**
 * Timer contextを使用するための関数
 * @returns {object} {state, dispatch}
 */
export const useTimerContext = () => {
  const { state, dispatch } = useContext(TimerContext);
  return { state, dispatch };
};
