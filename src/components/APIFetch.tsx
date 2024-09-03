import { Box, Checkbox, Grid2, Paper, styled } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type TaskType = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  deadline: Date;
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

export const ApiFetch = () => {
  //useQueryから返されるオブジェクトのdataプロパティを分割代入
  const {data} = useQuery({
    queryKey: ["tasks"], 
    //axiosを用いてgetリクエストからpromiseを作成
    queryFn: () => axios.get("http://localhost:8080/tasks").then(res => res.data)
  });

  return (
    <Box sx={{width: "100%"}}>
      <Grid2 container spacing={2} direction={"column"} alignItems={"center"}>
        {data?.map((task: TaskType) => {
          return (
            <TaskItem key={task.id}>
              <Box>
                タスク名：{task.title}
              </Box>
              <Box>
                <p>説明：{task.description ? task.description : "特筆事項なし"}</p>
                <p>処置：<Checkbox defaultChecked={task.completed} /></p>
                <p>期日：{task.deadline ? task.deadline.getTime().toFixed() : "指定なし"}</p>
              </Box>
            </TaskItem>
          )
        })}
      </Grid2>
    </Box>

    // <>
    //   <ul>
    //     {data?.map((task: TaskType) => {
    //       return (
    //         <div key={task.id}>
    //           <li>{task.id}</li>
    //           <ul>
    //             <li>{task.title}</li>
    //             <li>{task.description}</li>
    //             <li>{task.completed}</li>
    //             <li>{task.deadline?.getTime().toFixed()}</li>
    //           </ul>
    //         </div>
    //       );
    //     })}
    //   </ul>
    // </>
  )
}