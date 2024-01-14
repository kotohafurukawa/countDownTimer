import React from "react";
import ReactDOM from "react-dom/client";
import { Providers as NextUIProvider } from "./contexts/ThemeProvider.tsx";
import { ThemeSwitcher } from "./contexts/ThemeSwitcher.tsx";
import { TimerProvider } from "./contexts/index.tsx";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <TimerProvider>
        <App marginTopVal="20" />
      </TimerProvider>
      <ThemeSwitcher />
    </NextUIProvider>
  </React.StrictMode>
);
