import React, { useMemo } from "react";
import { Input } from "@nextui-org/react";
import { useTimerContext } from "../hooks/useTimerContext";
import { toHalfWidth } from "../utils/common";

export const InputMinute = () => {
  const { state, dispatch } = useTimerContext();
  const validateValue = (state: string): boolean => {
    const halfNumber = Number(toHalfWidth(state));
    return isNaN(halfNumber) || !(halfNumber >= 0 && halfNumber <= 60);
  };
  const isValidate = useMemo(() => {
    return validateValue(state.minuteInputValue);
  }, [state.minuteInputValue]);
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_INPUT_MINUTE", payload: e.target.value });
  };

  return (
    <Input
      name="minute"
      maxLength={2}
      variant="bordered"
      radius="lg"
      label="Input Minute"
      value={state.minuteInputValue}
      onChange={onChangeHandler}
      isInvalid={isValidate}
      errorMessage={isValidate && "数字を入力してください"}
    />
  );
};
