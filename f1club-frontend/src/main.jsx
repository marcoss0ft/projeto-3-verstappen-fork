import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx';
import Drivers from './components/Drivers';
import Driver from './components/Driver';
import Teams from './components/Teams';
import Login from './components/Login';
import Register from './components/Register';
import Favorites from './components/Favorites';
import Team from './components/Team';
import Standings from './components/Standings';
import Results from './components/Results/index.jsx';
import Result from './components/Result/index.jsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/drivers/",
    element: <Drivers />,
  },
  {
    path: "/drivers/:id/",
    element: <Driver />
  },
  {
    path: "/teams/",
    element: <Teams />
  },
  {
    path: "/teams/:id/",
    element: <Team />
  },
  {
    path: "/login/",
    element: <Login />
  },
  {
    path: "/register/",
    element: <Register />
  },
  {
    path: "/favorites/",
    element: <Favorites />
  },
  {
    path: "/standings/",
    element: <Standings />
  },
  {
    path: "/results/",
    element: <Results />
  },
  {
    path: "/results/:resultId/",
    element: <Result />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)