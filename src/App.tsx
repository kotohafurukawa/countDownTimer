import { useEffect } from "react";
import {
  CircularProgress,
  Card,
  CardBody,
  CardFooter,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useTimerContext } from "./hooks/useTimerContext";
import { InputTimer } from "./components/InputTimer";
import { PlayIcon } from "./icons/PlayIcon";
import { StopIcon } from "./icons/StopIcon";
import { ResetIcon } from "./icons/ResetIcon";
import { PlusIcon } from "./icons/PlusIcon";
import { DisplayTimer } from "./components/DisplayTimer";
import { toHalfWidth } from "./utils/common";

function App() {
  const { state, dispatch } = useTimerContext();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
  const onPressHandler = () => {
    const minute = Number(toHalfWidth(state.minuteInputValue));
    const second = Number(toHalfWidth(state.secondInputValue));
    const convertSecondDate = minute * 60 + second;
    if (!isNaN(minute) && !isNaN(second)) {
      dispatch({ type: "START_TIMER", payload: convertSecondDate });
      dispatch({ type: "SET_INPUT_MINUTE", payload: "0" });
      dispatch({ type: "SET_INPUT_SECOND", payload: "0" });
      onOpenChange();
    }
  };

  return (
    <>
      <Card className="w-[360px] h-[360px] mx-auto border-none bg-gradient-to-r from-blue-600 to-violet-600">
        <CardBody className="justify-center items-center pb-0">
          <CircularProgress
            classNames={{
              svg: "w-52 h-52 drop-shadow-md",
              indicator: "stroke-white",
              track: "stroke-white/10",
            }}
            value={state.timerValue}
            maxValue={state.startTime}
            strokeWidth={5}
            showValueLabel={false}
            aria-label="cont down"
          />
          <span className="absolute text-2xl font-semibold text-white">
            <DisplayTimer timerValue={state.timerValue} />
          </span>
        </CardBody>
        <CardFooter className="justify-center items-center gap-16 pt-4">
          <Button
            isIconOnly
            color={state.isRunning ? "danger" : "success"}
            onPress={() => {
              dispatch({ type: "TOGGLE_IS_RUNNING" });
            }}
          >
            {state.isRunning ? <StopIcon /> : <PlayIcon />}
          </Button>
          <Button
            isIconOnly
            color="secondary"
            onClick={() => {
              dispatch({ type: "RESET" });
            }}
          >
            <ResetIcon />
          </Button>
          <Button isIconOnly color="primary" onPress={onOpen}>
            <PlusIcon />
          </Button>
        </CardFooter>
      </Card>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                タイマー設定
              </ModalHeader>
              <ModalBody>
                <InputTimer
                  name={"minute"}
                  value={state.minuteInputValue}
                  label={"Input Minute"}
                  errorMessage={"60以下の数字を入力してください"}
                />
                <InputTimer
                  name={"second"}
                  value={state.secondInputValue}
                  label={"Input Second"}
                  errorMessage={"60以下の数字を入力してください"}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onPressHandler}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default App;
