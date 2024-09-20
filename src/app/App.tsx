import { TasksList } from '../components/TasksList';
import { NewTask } from '../components/NewTask';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools/production'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import "dayjs/locale/ja";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ja");

export function App() {
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <NewTask />
        <TasksList />
        <ReactQueryDevtools initialIsOpen={false} />
      </LocalizationProvider>
    </QueryClientProvider>
  );
};