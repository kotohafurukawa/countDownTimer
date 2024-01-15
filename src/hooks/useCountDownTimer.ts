import { useEffect } from "react";
import { useTimerContext } from "./useTimerContext";

/**
 * カウントダウンを制御するカスタムフックです。
 * isRunning,timerValue,dispatchが依存配列です。
 * isRunningがfalse あるいは
 * isRunning = false and timerValue <= 0 の時にタイマーの稼働を停止します。
 */
export const useCountDownTimer = () => {
  const { state, dispatch } = useTimerContext();

  useEffect(() => {
    if (state.isRunning && state.timerValue > 0) {
      // タイマー稼働
      const id = setInterval(() => {
        dispatch({ type: "DECREMENT", payload: 1 });
      }, 1000);

      // クリーンアップ関数でタイマー停止
      return () => {
        clearInterval(id);
      };
    }
  }, [state.timerValue, state.isRunning, dispatch]);

  // 残り時間が0秒になった時に稼働状態をfalseに切り替え
  useEffect(() => {
    if (state.timerValue <= 0 && state.isRunning) {
      dispatch({ type: "TOGGLE_IS_RUNNING" });
    }
  }, [state.timerValue, state.isRunning, dispatch]);
};
