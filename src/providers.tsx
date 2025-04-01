// app/providers.tsx


import {RouterProvider} from "react-router-dom";
import router from "@/router";
import {Provider} from "react-redux";
import store from "@/store";
import {Toaster} from "@/components/ui/toaster.tsx";
import App from "@/App.tsx";
import {ThemeProvider} from "@/components/theme-provider.tsx";
import React from "react";
import {LoaderProvider} from "@/components/loader/loader-provider.tsx";

export default function Providers({children}: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <LoaderProvider>
          <App/>
          {children}
          <RouterProvider router={router}/>
          <Toaster/>
        </LoaderProvider>
      </Provider>
    </ThemeProvider>
  );
}