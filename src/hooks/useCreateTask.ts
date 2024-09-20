import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { requestUrl, tasksListQueryKey } from "../config/requestConfig";

export function useCreateTask () {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (requestData: {
      title: string, 
      description: string, 
      completed: boolean, 
      deadline: string
    }) => {
      try {
        const res = await axios.post(requestUrl, requestData);
        return console.log(res);
      } catch (err) {
        return console.log(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: tasksListQueryKey})
    }
  });

  return mutation;
}