import { Box, Grid2, } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NewTask } from "./NewTask";
import TaskItem from "./TaskItem";
import TaskType from "../types/TaskType";
import { useState } from "react";
import EditingTaskItem from "./EditingTaskItem";
import { requestUrl, tasksListQueryKey } from "../config/requestConfig";

export const TasksList = () => {
  const [activeId, setActiveId] = useState<number | undefined>(undefined);

  const {isPending, isError, data, error} = useQuery({
    queryKey: tasksListQueryKey, 
    //axiosを用いてgetリクエストからpromiseを作成
    queryFn: () => axios.get(requestUrl).then(res => res.data)
  });

  if(isPending) return <Box>Loading......</Box>
  if(isError) return <Box>Error: {error.message}</Box>

  function handleClickTaskItem(taskId: number){
    setActiveId(taskId);
  }

  return (
    <Box>
      <Grid2 container spacing={2} direction={"column"} alignItems={"center"}>
        {data?.map((task: TaskType) => {
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
              onClick={() => handleClickTaskItem(task.id) }
            />
          );
        })}
      </Grid2>
      <NewTask />
    </Box>
  );
}