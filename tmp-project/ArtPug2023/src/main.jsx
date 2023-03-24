import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App'
import ContestsPage from './components/contests/ContestsPage'
import { loader as contestsPageLoader } from './components/contests/ContestsPageLoader'
import ErrorPage from './components/ErrorPage'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import AppEntries, { loader as contestsLoader } from './routes/AppEntries'

/** Used to define the structure of the website */
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/contests/:type",
        element: <ContestsPage />,
        errorElement: <ErrorPage />,
        loader: contestsPageLoader
      },
      {
        path: "/",
        element: <Navigate replace to={"/contests/join"} />
      }
    ],
  },
  {
    path: "/contest/:id",
    element: <AppEntries />,
    errorElement: <ErrorPage />,
    loader: contestsLoader
  },
]);

/** App main entry */
ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    {localStorage.setItem('chakra-ui-color-mode', 'dark')}
    <RouterProvider router={router} />
  </ChakraProvider>,
)
