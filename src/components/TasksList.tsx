import { Box, Checkbox, Grid2, Paper, styled } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";
import { NewTask } from "./NewTask";

type TaskType = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  deadline: string
};

const TaskItem = styled(Paper)(({theme}) => ({
  width: 400,
  height: 200,
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {backgroundColor: "#1A2027"})
}));

export const TasksList = () => {
  const getTasksUrl = "http://localhost:8080/tasks";

  const {isPending, isError, data, error} = useQuery({
    queryKey: ["tasks"], 
    //axiosを用いてgetリクエストからpromiseを作成
    queryFn: () => axios.get(getTasksUrl).then(res => res.data)
  });

  if(isPending) return <Box>Loading......</Box>
  if(isError) return <Box>Error: {error.message}</Box>

  return (
    <Box sx={{width: "100%"}}>
      <Grid2 container spacing={2} direction={"column"} alignItems={"center"}>

        {data?.map((task: TaskType) => {
          const deadline = 
            task.deadline 
            ? dayjs(task.deadline).format("YYYY年M月D日H時m分")
            : "指定なし";

          return (
            <TaskItem key={task.id}>
              <Box>
                タスク名：{task.title}
              </Box>
              <Box>
                <p>説明：{task.description ? task.description : "特筆事項なし"}</p>
                <p>処置：<Checkbox defaultChecked={task.completed} /></p>
                <p>期日：{deadline}</p>
              </Box>
            </TaskItem>
          )
        })}
        
      </Grid2>
      <NewTask />
    </Box>
  );
}