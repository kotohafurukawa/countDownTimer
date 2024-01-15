type displayTimerProps = {
  timerValue: number;
};

/**
 * 残り時間を xx分●●秒 の形式で返すコンポーネント
 * @param {object} timerValue - 残り時間（秒）
 * @returns string
 */
export const DisplayTimer = ({ timerValue }: displayTimerProps) => {
  const minute = Math.floor(timerValue / 60);
  const second = timerValue % 60;
  const minFormat = new Intl.NumberFormat("ja-JP", {
    style: "unit",
    unit: "minute",
  });
  const secondFormat = new Intl.NumberFormat("ja-JP", {
    style: "unit",
    unit: "second",
  });

  return `${minFormat.format(minute)}${secondFormat.format(second)}`;
};
