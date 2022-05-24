import * as React from 'react'
import { RouteObject } from 'react-router-dom'
import { HomePage } from './home'
import * as RootLayout from './root.layout'
import { SignUpPage } from './signup'

const TodoPage = React.lazy(() => import('./todo').then(module => ({ default: module.TodoPage })))

export const paths = {
  home: () => '/',
  todos: () => '/todos',
  todo: (id: `${number}` | number | ':id') => `/todos/${id}`,
  signup: () => '/signup',
} as const

export const routes: RouteObject[] = [
  {
    path: paths.home(),
    element: <RootLayout.Page />,
    loader: RootLayout.loader,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: paths.todo(':id'),
        element: (
          <React.Suspense fallback='loading...'>
            <TodoPage />
          </React.Suspense>
        ),
      },
      {
        path: paths.signup(),
        element: <SignUpPage />,
      },
    ],
  },
]
