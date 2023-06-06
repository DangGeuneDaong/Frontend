import React from "react";
import ReactDOM from "react-dom/client";

import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import App from "./App";
import { theme } from "./assets/styles/theme";
import GlobalStyles from "./assets/styles/GlobalStyles";

const $root = document.getElementById("root") as HTMLElement;

const queryClient = new QueryClient();

ReactDOM.createRoot($root).render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <App />
            <GlobalStyles />
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);
