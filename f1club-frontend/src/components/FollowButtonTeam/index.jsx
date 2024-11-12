import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Popup from "../Popup";
import "./index.css";
import ApplyTeamColors from "../ApplyTeamColors";


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
        /*
        axios
            .get(`https://projeto-3-parte-2-verstappen.onrender.com/teams/`, config)
            .then((response) => {
                const followedTeam = response.data.find((team) => team.teamId === teamId);
                if (followedTeam) {
                    setIsFollowing(true);
                    setTeamFollowingId(followedTeam.id);
                    ApplyTeamColors(teamId); 
                } else {
                    setIsFollowing(false);
                }
            })
            .catch((error) => {
                console.error("Erro ao carregar estado de seguir piloto:", error);
            });
        */
            axios
            .get(`http://127.0.0.1:8000/teams/`, config)
            .then((response) => {
                const followedTeam = response.data.find((team) => team.teamId === teamId);
                if (followedTeam) {
                    setIsFollowing(true);
                    setTeamFollowingId(followedTeam.id);
                    ApplyTeamColors(teamId); 
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
            /*
            axios
                .delete(`https://projeto-3-parte-2-verstappen.onrender.com/teams/${teamFollowingId}/`, config)
                .then(() => {
                    setIsFollowing(false);
                    setTeamFollowingId(null);
                    localStorage.removeItem("favoriteTeam");
                    ApplyTeamColors(null); // Remove as cores se desfavoritar
                })
                .catch((error) => {
                    console.error("Erro ao deixar de seguir piloto:", error);
                });
            */
                axios
                .delete(`http://127.0.0.1:8000/teams/${teamFollowingId}/`, config)
                .then(() => {
                    setIsFollowing(false);
                    setTeamFollowingId(null);
                    localStorage.removeItem("favoriteTeam");
                    ApplyTeamColors(null); // Remove as cores se desfavoritar
                })
                .catch((error) => {
                    console.error("Erro ao deixar de seguir piloto:", error);
                });
        } else {
            /*
            axios
                .get(`https://projeto-3-parte-2-verstappen.onrender.com/teams/`, config)
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
            */
                axios
                .get(`http://127.0.0.1:8000/teams/`, config)
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
        /*
        axios
            .post(`https://projeto-3-parte-2-verstappen.onrender.com/teams/`, { teamId: teamId }, config)
            .then((response) => {
                setIsFollowing(true);
                setTeamFollowingId(response.data.id);
                localStorage.setItem("favoriteTeam", teamId);
                ApplyTeamColors(teamId); // Aplica as novas cores
                setShowPopup(false);
            })
            .catch((error) => {
                console.error("Erro ao seguir piloto:", error);
            });
        */
        axios
        .post(`http://127.0.0.1:8000/teams/`, { teamId: teamId }, config)
        .then((response) => {
            setIsFollowing(true);
            setTeamFollowingId(response.data.id);
            localStorage.setItem("favoriteTeam", teamId);
            ApplyTeamColors(teamId); // Aplica as novas cores
            setShowPopup(false);
        })
        .catch((error) => {
            console.error("Erro ao seguir piloto:", error);
        });
    };

    const handleSwitchTeam = () => {
        /*
        axios
            .get(`https://projeto-3-parte-2-verstappen.onrender.com/teams/`, config)
            .then((response) => {
                const currentTeamId = response.data[0].id;
                localStorage.removeItem("favoriteTeam");
                return axios.delete(`https://projeto-3-parte-2-verstappen.onrender.com/teams/${currentTeamId}/`, config);
            })
            .then(() => {
                followNewTeam();
            })
            .catch((error) => {
                console.error("Erro ao trocar de time seguido:", error);
            });
        */
            axios
            .get(`http://127.0.0.1:8000/teams/`, config)
            .then((response) => {
                const currentTeamId = response.data[0].id;
                localStorage.removeItem("favoriteTeam");
                return axios.delete(`http://127.0.0.1:8000/teams/${currentTeamId}/`, config);
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
