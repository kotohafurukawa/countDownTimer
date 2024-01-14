import {
  CircularProgress,
  Card,
  CardBody,
  CardFooter,
  Button,
} from "@nextui-org/react";
import { useTimerContext } from "./hooks/useTimerContext";
import { PlayIcon } from "./icons/PlayIcon";
import { StopIcon } from "./icons/StopIcon";
import { ResetIcon } from "./icons/ResetIcon";
import { PlusIcon } from "./icons/PlusIcon";
type propsType = {
  marginTopVal: string;
};

function App({ marginTopVal }: propsType) {
  const { state, dispatch } = useTimerContext();
  return (
    <div className={`mt-${marginTopVal}`}>
      <Card className="w-[360px] h-[360px] mx-auto border-none bg-gradient-to-r from-blue-600 to-violet-600">
        <CardBody className="justify-center items-center pb-0">
          <CircularProgress
            classNames={{
              svg: "w-52 h-52 drop-shadow-md",
              indicator: "stroke-white",
              track: "stroke-white/10",
            }}
            value={70}
            maxValue={state.startTime}
            strokeWidth={5}
            showValueLabel={false}
            aria-label="cont down"
          />
          <span className="absolute text-4xl font-semibold text-white">
            {state.timerValue}
          </span>
        </CardBody>
        <CardFooter className="justify-center items-center gap-16 pt-4">
          <Button
            isIconOnly
            color={state.isRunning ? "success" : "danger"}
            onPress={() => {
              dispatch({ type: "TOGGLE_IS_RUNNING" });
            }}
          >
            {state.isRunning ? <PlayIcon /> : <StopIcon />}
          </Button>
          <Button isIconOnly color="secondary">
            <ResetIcon />
          </Button>
          <Button isIconOnly color="primary">
            <PlusIcon />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default App;
