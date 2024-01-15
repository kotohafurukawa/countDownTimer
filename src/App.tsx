import {
  CircularProgress,
  Card,
  CardBody,
  CardFooter,
  Button,
} from "@nextui-org/react";
import { useCountDownTimer } from "./hooks/useCountDownTimer";
import { useTimerContext } from "./hooks/useTimerContext";
import { PlayIcon } from "./icons/PlayIcon";
import { StopIcon } from "./icons/StopIcon";
import { ResetIcon } from "./icons/ResetIcon";
import { PlusIcon } from "./icons/PlusIcon";
import { DisplayTimer } from "./components/DisplayTimer";

function App() {
  const { state, dispatch } = useTimerContext();
  useCountDownTimer();
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
          <Button isIconOnly color="primary">
            <PlusIcon />
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default App;
