import { TasksList } from '../components/TasksList';
import { NewTask } from '../components/NewTask';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools/production'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function App() {
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