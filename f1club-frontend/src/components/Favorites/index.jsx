import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AppBar from "../AppBar";
import SideBar from "../SideBar";
import "./index.css";

export default function Favorites() {
    const navigate = useNavigate();
    const [favorite_drivers, setFavoriteDrivers] = useState([]);
    const [favorite_team, setFavoriteTeam] = useState([]);

    const config = {
        headers: {
          Authorization: `token ${localStorage.getItem("token")}`,
        },
      };

    const carregaDrivers = () => {
        /*
        axios
          .get("https://projeto-2-backend-verstappen-front.onrender.com/drivers/", config)
          .then((response) => setFavoriteDrivers(response.data))
          .catch((error) => {
            console.error("Erro ao carregar drivers favoritos:", error);
          });
        */
        axios
          .get("http://127.0.0.1:8000/drivers/", config)
          .then((response) => setFavoriteDrivers(response.data))
          .catch((error) => {
            console.error("Erro ao carregar drivers favoritos:", error);
          });
      };
    
    const carregaTeam = () => {
        /*
        axios
          .get("https://projeto-2-backend-verstappen-front.onrender.com/teams/", config)
          .then((response) => setFavoriteTeam(response.data))
          .catch((error) => {
            console.error("Erro ao carregar team favorito:", error);
          });
        */
          axios
          .get("http://127.0.0.1:8000/teams/", config)
          .then((response) => setFavoriteTeam(response.data))
          .catch((error) => {
            console.error("Erro ao carregar team favorito:", error);
          });
      };

        
    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            navigate("/login/");
        }
        else {
            carregaDrivers();
            carregaTeam();
        }
    }, []);

    return (
        <>
            <AppBar />
            <SideBar />

            <div className="favorites-page">
            <div className="favorite-driver-section">
                <h1 className="favorite-driver-title">Favorite Drivers</h1>
                <div className="favorite-driver-list">
                {favorite_drivers.length > 0 ? (
                    favorite_drivers.map((driver, index) => (
                        <button 
                            onClick={() => navigate(`/drivers/${driver.driverId}`)} 
                            key={index}
                        >
                            <img
                                className="favorite-driver-card"
                                src={`/assets/img/Pilotos/${driver.driverId}/card.png`} 
                                alt={driver.driverId} 
                            />
                        </button>
                    ))
                ) : (
                    <p className="no-found">No favorite drivers.</p>
                )}
                </div>
            </div>
            <div className="vertical-divider"></div>
            <div className="favorite-team-section">
                <h1 className="favorite-team-title">Favorite Team</h1>
                {favorite_team.length > 0 ? (
                    favorite_team.map((team, index) => (
                        <button 
                            onClick={() => navigate(`/teams/${team.teamId}`)} 
                            key={index}
                        >
                            <img 
                                className="favorite-team-card"
                                src={`/assets/img/Equipes/${team.teamId}/card.png`} 
                                alt={team.teamId} 
                            />
                        </button>
                    ))
                ) : (
                    <p className="no-found">No favorite team.</p>
                )}

            </div>
        </div>
        </>
    );
}
