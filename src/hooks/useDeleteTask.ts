import { useMutation, useQueryClient } from "@tanstack/react-query";
import { requestUrl, tasksListQueryKey } from "../config/requestConfig";
import axios from "axios";

export default function useDeleteTask (taskId: number) {
  const deleteRequestUrl = `${requestUrl}/${taskId}`;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: 
      () => axios.delete(deleteRequestUrl)
      .then(res => console.log(res))
      .catch(err => console.log(err)),
    onSuccess:
      () => queryClient.invalidateQueries({queryKey: tasksListQueryKey})
  })

  return mutation;
}