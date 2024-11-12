import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./index.css";

export default function FollowButtonDriver({ driverId }) {
    const navigate = useNavigate();
    const [isFollowing, setIsFollowing] = useState(false);
    const [driverFollowingId, setDriverFollowingId] = useState(null);

    const config = {
        headers: {
            Authorization: `token ${localStorage.getItem("token")}`,
        },
    };

    const carregaIsFollowing = () => {
        /*
        axios
            .get(`https://projeto-3-parte-2-verstappen.onrender.com/drivers/`, config)
            .then((response) => {
                const followedDriver = response.data.find((driver) => driver.driverId === driverId);
                if (followedDriver) {
                    setIsFollowing(true);
                    setDriverFollowingId(followedDriver.id);
                } else {
                    setIsFollowing(false);
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.error("Erro ao carregar estado de seguir piloto:", error.response.data);
                    console.error("Status:", error.response.status);
                } else if (error.request) {
                    console.error("No response received:", error.request);
                } else {
                    console.error("Error setting up request:", error.message);
                }
            });
            */
            axios
            .get(`http://127.0.0.1:8000/drivers/`, config)
            .then((response) => {
                const followedDriver = response.data.find((driver) => driver.driverId === driverId);
                if (followedDriver) {
                    setIsFollowing(true);
                    setDriverFollowingId(followedDriver.id);
                } else {
                    setIsFollowing(false);
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.error("Erro ao carregar estado de seguir piloto:", error.response.data);
                    console.error("Status:", error.response.status);
                } else if (error.request) {
                    console.error("No response received:", error.request);
                } else {
                    console.error("Error setting up request:", error.message);
                }
            });
    };

    const handleFollow = () => {
        if (isFollowing) {
            /*
            axios
                .delete(`https://projeto-3-parte-2-verstappen.onrender.com/drivers/${driverFollowingId}/`, config)
                .then(() => {
                    setIsFollowing(false);
                    setDriverFollowingId(null);
                })
                .catch((error) => {
                    console.error("Erro ao deixar de seguir piloto:", error);
                });
            */
                axios
                .delete(`http://127.0.0.1:8000/drivers/${driverFollowingId}/`, config)
                .then(() => {
                    setIsFollowing(false);
                    setDriverFollowingId(null);
                })
                .catch((error) => {
                    console.error("Erro ao deixar de seguir piloto:", error);
                });
        } else {
            /*
            axios
                .post(`https://projeto-3-parte-2-verstappen.onrender.com/drivers/`, { driverId: driverId }, config)
                .then((response) => {
                    setIsFollowing(true);
                    setDriverFollowingId(response.data.id);
                })
                .catch((error) => {
                    console.error("Erro ao seguir piloto:", error);
                });
            */
                axios
                .post(`http://127.0.0.1:8000/drivers/`, { driverId: driverId }, config)
                .then((response) => {
                    setIsFollowing(true);
                    setDriverFollowingId(response.data.id);
                })
                .catch((error) => {
                    console.error("Erro ao seguir piloto:", error);
                });
        }
    };

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login/");
        } else {
            carregaIsFollowing();
        }
    }, [isFollowing]);

    return (
        <button
            className={`follow-button ${isFollowing ? "unfollow" : "follow"}`}
            onClick={handleFollow}
        >
            {isFollowing ? "Unfollow" : "Follow"}
        </button>
    );
}
