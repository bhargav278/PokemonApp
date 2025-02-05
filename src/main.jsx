import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

import PokemonDetailPage from './components/PokemonDetailPage.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home.jsx';

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element:<Home/>

      },
      {
        path: "/:name",
        element: <PokemonDetailPage />
      }
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider>
      <RouterProvider router={appRouter}>
        <App />
      </RouterProvider>

    </MantineProvider>
  </StrictMode>,
)
