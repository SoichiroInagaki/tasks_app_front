import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { requestUrl, tasksListQueryKey } from "../config/requestConfig";
import { TaskType } from "../types/TaskType";

export function useUpdateTask () {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (task: TaskType) => {
        const {id, ...editedTask} = task;
        const putRequestUrl = `${requestUrl}/${id}`; 
        try {
          const res = await axios.put(putRequestUrl, editedTask);
          return console.log(res);
        } catch (err) {
          return console.log(err);
        }
      },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: tasksListQueryKey});
    }
  });

  return mutation;
}