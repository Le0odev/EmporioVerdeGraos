// src/utils/reactQueryClient.js

import { QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import api from './api';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // Desativa a tentativa automática de retentativas em caso de falha
    },
  },
});

export { queryClient, ReactQueryDevtools };
