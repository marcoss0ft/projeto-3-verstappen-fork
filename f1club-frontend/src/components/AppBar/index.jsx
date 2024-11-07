import "./index.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function AppBar() {
    const [iconSrcLogin, setIconSrcLogin] = useState('/Icons/signin.png');
    const [iconSrcLogo, setIconSrcLogo] = useState('/Icons/f1.png');
    const [favoriteTeamLogo, setFavoriteTeamLogo] = useState(null);
    const [favoriteTeamCar, setFavoriteTeamCar] = useState(null);
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    
        const storedUsername = localStorage.getItem('username');
        setUsername(storedUsername);

        const updateFavoriteTeamLogo = () => {
            const favoriteTeam = localStorage.getItem('favoriteTeam');
            if (favoriteTeam) {
                setFavoriteTeamLogo(`/assets/img/Equipes/${favoriteTeam}/logo.png`);
            } else {
                setFavoriteTeamLogo(null); 
            }
        };

        const updateFavoriteTeamCar = () => {
            const favoriteTeam = localStorage.getItem('favoriteTeam');
            if (favoriteTeam) {
                setFavoriteTeamCar(`/assets/img/Equipes/${favoriteTeam}/car.png`);
            } else {
                setFavoriteTeamCar(null);
            }
        };


        updateFavoriteTeamLogo();
        updateFavoriteTeamCar();

        const interval = setInterval(() => {
            updateFavoriteTeamLogo();
            updateFavoriteTeamCar();
        }, 200);


        return () => clearInterval(interval);
    }, []);

    const handleMouseEnterLogin = () => {
        setIconSrcLogin('/Icons/signin_preto.png');
    };

    const handleMouseLeaveLogin = () => {
        setIconSrcLogin('/Icons/signin.png');
    };

    const handleMouseEnterLogo = () => {
        setIconSrcLogo('/Icons/f1-preto.png');
    };

    const handleMouseLeaveLogo = () => {
        setIconSrcLogo('/Icons/f1.png');
    };

    const logout = () => {
        localStorage.clear();  
        navigate('/login/');
    };

    return (
        <div className="appbar">
            <button onClick={() => navigate("/")} className="logo-button" onMouseEnter={handleMouseEnterLogo} onMouseLeave={handleMouseLeaveLogo}>
                <img src={iconSrcLogo} className="logo" alt="F1 Logo" />
            </button>
            {favoriteTeamLogo && (
                <img src={favoriteTeamLogo} className="favorite-team-logo" alt="Favorite Team Logo" />
            )}
            <div className="middle-bar">
                <button className="subtitle" onClick={() => navigate("/standings/")}>Standings</button>
                <button className="subtitle" onClick={() => navigate("/drivers/")}>Drivers</button>
                <button className="subtitle" onClick={() => navigate("/teams/")}>Teams</button>
                <button className="subtitle" onClick={() => navigate ("/results/")}>Results</button>
            </div>
            {favoriteTeamCar && (
                <img src={favoriteTeamCar} className="favorite-team-car" alt="Favorite Team Car" />
            )}
            {!isLoggedIn && (
                <button 
                    className="sign-in" 
                    onClick={() => navigate("/login/")} 
                    onMouseEnter={handleMouseEnterLogin} 
                    onMouseLeave={handleMouseLeaveLogin}
                >
                    <img className="icon-signin" src={iconSrcLogin} alt="signin" />
                    <p>Login</p>
                </button>
            )}

            {isLoggedIn && (
                <div className="logout-row">
                <p className="welcome">Welcome, {username}</p>
                <button 
                    className="sign-in" 
                    onClick={logout} 
                    onMouseEnter={handleMouseEnterLogin} 
                    onMouseLeave={handleMouseLeaveLogin}
                >
                    <img className="icon-signin" src={iconSrcLogin} alt="signin" />
                    <p>Logout</p>
                </button>
                </div>
            )}
        </div>
    );
}
