import Router from "router/Router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import defaultOptions from "configs/reactQuery";
import Layout from "layout/Layout";


function App() {
  const queryClient = new QueryClient({ defaultOptions })

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Router />
          <Toaster
                position="top-center"
                reverseOrder={false}
          />
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App;
