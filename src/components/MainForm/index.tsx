import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import type React from "react";
import { useRef } from "react";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import type { TaskModel } from "../../models/TaskModel";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import { formatSecondsToMinutes } from "../../utils/formatSecondsToMinutes";

export function MainForm() {
  const { state, setState } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);

  // Ciclos
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      alert("Digite o nome da tarefa");
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completedDate: null,
      interruptedDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };

    const secondsRemaining = newTask.duration * 60;

    setState((prevState) => {
      return {
        ...prevState,
        config: { ...prevState.config },
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining,
        formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
        tasks: [...prevState.task, newTask],
      };
    });
  }

  function handleInterrupTask() {
    setState((prevState) => {
      return {
        ...prevState,
        activeTask: null,
        currentCycle: nextCycle,
        secondsRemaining: 0,
        formattedSecondsRemaining: "00:00",
      };
    });
  }

  return (
    <form onSubmit={handleCreateNewTask} className="form" action="">
      <div className="formRow">
        <DefaultInput
          label="Tarefa"
          type="text"
          id="taskInput"
          placeholder="Tarefa"
          ref={taskNameInput}
          disabled={!!state.activeTask}
        />
      </div>

      <div className="formRow">
        <p>Lorem ipsum dolor sit amet.</p>
      </div>

      {state.currentCycle > 0 && (
        <div className="formRow">
          <Cycles />
        </div>
      )}

      <div className="formRow">
        {!state.activeTask && (
          <DefaultButton
            key="new_task"
            type="submit"
            aria-label="Iniciar nova tarefa"
            title="Iniciar nova tarefa"
            icon={<PlayCircleIcon />}
          />
        )}

        {!!state.activeTask && (
          <DefaultButton
            key="stop_task"
            type="button"
            aria-label="Parar tarefa Atual"
            title="Parar tarefa Atual"
            color="red"
            icon={<StopCircleIcon />}
            onClick={handleInterrupTask}
          />
        )}
      </div>
    </form>
  );
}
