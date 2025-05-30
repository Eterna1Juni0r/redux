import { createBrowserRouter, Link, Outlet, redirect } from "react-router";
import { store } from "./store";
import { queryClient } from "../shared/api";
import { QueryClientProvider } from "@tanstack/react-query";

const loadStore = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(store), 0);
  });

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <QueryClientProvider client={queryClient}>
        <div className="container p-5 flex flex-col gap-5">
          <header className="py-5 flex gap-4">
            <Link to="users">Users</Link>
            <Link to="counters">Counters</Link>
          </header>
          <Outlet />
        </div>
      </QueryClientProvider>
    ),
    children: [
      {
        index: true,
        loader: () => redirect("/users"),
      },
      {
        path: "users",
        lazy: () =>
          import("../modules/users").then((m) => ({
            Component: m.UsersList,
            loader: () =>
              loadStore().then(() => {
                return null;
              }),
          })),
      },
      {
        path: "users/:id",
        lazy: () =>
          import("../modules/users").then((m) => ({
            Component: m.UserInfo,
            loader: () =>
              loadStore().then(() => {
                return null;
              }),
          })),
      },
      {
        path: "counters",
        lazy: () =>
          import("../modules/counters").then((m) => ({
            Component: m.Counters,
          })),
      },
    ],
  },
]);
