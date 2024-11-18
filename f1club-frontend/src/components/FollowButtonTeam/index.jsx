import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Popup from "../Popup";
import "./index.css";
import teamColors from "../TeamColors";

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

export default function FollowButtonTeam({ teamId }) {
    const navigate = useNavigate();
    const [isFollowing, setIsFollowing] = useState(false);
    const [teamFollowingId, setTeamFollowingId] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const config = {
        headers: {
            Authorization: `token ${localStorage.getItem("token")}`,
        },
    };

    const carregaIsFollowing = () => {
        axios
            .get(`https://projeto-2-backend-verstappen-front-1.onrender.com/teams/`, config)
            .then((response) => {
                const followedTeam = response.data.find((team) => team.teamId === teamId);
                if (followedTeam) {
                    setIsFollowing(true);
                    setTeamFollowingId(followedTeam.id);
                    applyTeamColors(teamId); 
                } else {
                    setIsFollowing(false);
                }
            })
            .catch((error) => {
                console.error("Erro ao carregar estado de seguir piloto:", error);
            });
    };

    const handleFollow = () => {
        if (isFollowing) {
            axios
                .delete(`https://projeto-2-backend-verstappen-front-1.onrender.com/teams/${teamFollowingId}/`, config)
                .then(() => {
                    setIsFollowing(false);
                    setTeamFollowingId(null);
                    localStorage.removeItem("favoriteTeam");
                    applyTeamColors(null); // Remove as cores se desfavoritar
                })
                .catch((error) => {
                    console.error("Erro ao deixar de seguir piloto:", error);
                });
        } else {
            axios
                .get(`https://projeto-2-backend-verstappen-front.onrender.com/teams/`, config)
                .then((response) => {
                    const alreadyFollowing = response.data.some((team) => team.id !== teamFollowingId);
                    if (alreadyFollowing) {
                        setShowPopup(true);
                    } else {
                        followNewTeam();
                    }
                })
                .catch((error) => {
                    console.error("Erro ao verificar times seguidos:", error);
                });
        }
    };

    const followNewTeam = () => {
        axios
            .post(`https://projeto-2-backend-verstappen-front.onrender.com/teams/`, { teamId: teamId }, config)
            .then((response) => {
                setIsFollowing(true);
                setTeamFollowingId(response.data.id);
                localStorage.setItem("favoriteTeam", teamId);
                applyTeamColors(teamId); // Aplica as novas cores
                setShowPopup(false);
            })
            .catch((error) => {
                console.error("Erro ao seguir piloto:", error);
            });
    };

    const handleSwitchTeam = () => {
        axios
            .get(`https://projeto-2-backend-verstappen-front.onrender.com/teams/`, config)
            .then((response) => {
                const currentTeamId = response.data[0].id;
                localStorage.removeItem("favoriteTeam");
                return axios.delete(`https://projeto-2-backend-verstappen-front.onrender.com/teams/${currentTeamId}/`, config);
            })
            .then(() => {
                followNewTeam();
            })
            .catch((error) => {
                console.error("Erro ao trocar de time seguido:", error);
            });
    };
    
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login/");
        } else {
            carregaIsFollowing();
        }
    }, [isFollowing]);

    return (
        <>
            <button
                className={`follow-button ${isFollowing ? "unfollow" : "follow"}`}
                onClick={handleFollow}
            >
                {isFollowing ? "Unfollow" : "Follow"}
            </button>
            {showPopup && (
                <Popup 
                    message="You are already following another team. Would you like to switch?" 
                    onClose={() => setShowPopup(false)} 
                    onConfirm={handleSwitchTeam} 
                />
            )}
        </>
    );
}
