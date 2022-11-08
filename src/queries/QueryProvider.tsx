import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
export const QueryProvider = (p: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>{p.children}</QueryClientProvider>
);
