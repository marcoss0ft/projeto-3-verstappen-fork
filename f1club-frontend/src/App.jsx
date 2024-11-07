import "./App.css";
import AppBar from "./components/AppBar";
import SideBar from "./components/SideBar";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      <AppBar />
      <SideBar />
      <div className="grid-container">
        <div
          className="widget"
          style={{ "--order": 1 }}
          onClick={() => handleNavigation("/drivers")}
        >
          <img
            src="/assets/img/widgets/drivers.png"
            alt="Drivers"
            className="widget-image"
          />
        </div>
        <div
          className="widget"
          style={{ "--order": 2 }}
          onClick={() => handleNavigation("/teams")}
        >
          <img
            src="/assets/img/widgets/teams.png"
            alt="Teams"
            className="widget-image"
          />
        </div>
        <div
          className="widget"
          style={{ "--order": 3 }}
          onClick={() => handleNavigation("/standings")}
        >
          <img
            src="/assets/img/widgets/standings.png"
            alt="Standings"
            className="widget-image"
          />
        </div>
        <div
          className="widget"
          style={{ "--order": 4 }}
          onClick={() => handleNavigation("/favorites")}
        >
          <img
            src="/assets/img/widgets/favorites.png"
            alt="Favorites"
            className="widget-image"
          />
        </div>
      </div>
    </>
  );
}

export default App;
