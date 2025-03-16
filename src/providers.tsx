// app/providers.tsx


import {RouterProvider} from "react-router-dom";
import router from "@/router";
import {Provider} from "react-redux";
import store from "@/store";
import {Toaster} from "@/components/ui/toaster.tsx";
import App from "@/App.tsx";
import {ThemeProvider} from "@/components/theme-provider.tsx";
import React from "react";

export default function Providers(children) {
  return (

    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store} children={children}>
        <RouterProvider router={router}/>

        <App/>
        <Toaster/>
        </Provider>
    </ThemeProvider>

  )
}