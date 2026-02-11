import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CacheProvider, ThemeProvider } from "@emotion/react";
import { createRoot } from "react-dom/client";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import { theme } from "../themeConfig.ts";
import { StrictMode } from "react";
import { prefixer } from "stylis";
import App from "./App.tsx";
import "./index.css";

const rtlCache = createCache({
  key: "mui-rtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <CacheProvider value={rtlCache}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </CacheProvider>
    </QueryClientProvider>
  </StrictMode>,
);
