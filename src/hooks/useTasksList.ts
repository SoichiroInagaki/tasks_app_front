import { useQuery } from "@tanstack/react-query";
import { requestUrl, tasksListQueryKey } from "../config/requestConfig";
import axios from "axios";

export function useTasksList () {
  const info = useQuery({
    queryKey: tasksListQueryKey, 
    queryFn: () => axios.get(requestUrl).then(res => res.data)
  });

  return info;
}