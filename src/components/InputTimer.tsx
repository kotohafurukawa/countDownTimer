import React, { useMemo } from "react";
import { Input } from "@nextui-org/react";
import { useTimerContext } from "../hooks/useTimerContext";
import { toHalfWidth } from "../utils/common";
type PropsType = {
  value: string;
  name: "second" | "minute";
  label: string;
  errorMessage: string;
};

export const InputTimer = ({ value, name, label, errorMessage }: PropsType) => {
  const { dispatch } = useTimerContext();
  const validateValue = (state: string): boolean => {
    const halfNumber = Number(toHalfWidth(state));
    return isNaN(halfNumber) || !(halfNumber >= 0 && halfNumber <= 60);
  };
  const isValidate = useMemo(() => {
    return validateValue(value);
  }, [value]);
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (name) {
      case "minute":
        dispatch({ type: "SET_INPUT_MINUTE", payload: e.target.value });
        break;
      case "second":
        dispatch({ type: "SET_INPUT_SECOND", payload: e.target.value });
        break;

      default:
        throw new Error("something is wrong. check name value");
    }
  };

  return (
    <Input
      name={name}
      label={label}
      value={value}
      onChange={onChangeHandler}
      isInvalid={isValidate}
      errorMessage={isValidate && errorMessage}
      maxLength={2}
      variant="bordered"
      radius="lg"
      inputMode="numeric"
    />
  );
};
