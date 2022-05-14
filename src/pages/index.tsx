import * as React from "react";
import type { RouteObject } from "react-router-dom";
import { lazyLoad } from "~/shared/libs/lazy_load";
import { HomePage } from "./home";

const TodoPage = lazyLoad(() => import("./todo"), "TodoPage");

export const paths = {
  home: () => "/",
  todos: () => "/todos",
  todo: (id: `${number}` | number | ":id") => `/todos/${id}`,
};

export const routes: RouteObject[] = [
  {
    path: paths.home(),
    element: <HomePage />,
  },
  {
    path: paths.todo(":id"),
    element: (
      <React.Suspense fallback="loading...">
        <TodoPage />
      </React.Suspense>
    ),
  },
];
