import { Box, Stack, } from "@mui/material";
import { TaskItem } from "./TaskItem";
import { TaskType } from "../types/TaskType";
import { EditingTaskItem } from "./EditingTaskItem";
import { useTasksList } from "../hooks/useTasksList";
import { useState } from "react";

export const TasksList = () => {
  const [activeId, setActiveId] = useState<number | undefined>(undefined);
  const info = useTasksList();

  if(info.isPending) return <Box>Loading......</Box>
  if(info.isError) return <Box>Error: {info.error?.message}</Box>

  return (
    <Stack spacing={2} direction={"column"} alignItems={"center"}>
      {info.data?.map((task: TaskType) => {
        if(activeId === task.id){
          return (
            <EditingTaskItem
              key={`editing${task.id}`}
              task={task}
              onEditEnd={() => setActiveId(undefined)}
            />
          )
        }
        return (
          <TaskItem  
            key={task.id}
            task={task}
            onClick={() => setActiveId(task.id)}
          />
        );
      })}
    </Stack>
  );
}