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
import News from './components/News/index.jsx';
import './index.css';

function applyTeamColors(teamId) {
  if (teamId === null) {

      document.documentElement.style.setProperty('--sidebar-bg-color', '#807F7F');
      document.documentElement.style.setProperty('--icon-bg-color', '#FF1D00');
      document.documentElement.style.setProperty('--appbar-bg-color', '#FF1D00');
      document.documentElement.style.setProperty('--background-color', '#5A5A5A');
      console.log('Cores redefinidas para os valores padrão.');
      return;
  }

  const colors = teamColors[teamId];
  if (colors) {
    document.documentElement.style.setProperty('--sidebar-bg-color', colors.sidebarBgColor);
    document.documentElement.style.setProperty('--icon-bg-color', colors.iconBgColor);
    document.documentElement.style.setProperty('--appbar-bg-color', colors.appbarBgColor);
    document.documentElement.style.setProperty('--background-color', colors.backgroundColor);
    console.log('Cores aplicadas:', colors);
  }
}
// Aplique as cores ao carregar a aplicação
const favoriteTeam = localStorage.getItem("favoriteTeam");
if (favoriteTeam) {
  applyTeamColors(favoriteTeam);
} else {
  applyTeamColors(null); // Cores padrão se não houver time favorito
}

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
  },
  {
    path: "/news/",
    element: <News />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
