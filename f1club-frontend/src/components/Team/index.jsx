import "./index.css";
import AppBar from "../AppBar";
import SideBar from "../SideBar";
import TeamDictionary from "../TeamDictionary";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FindPodiums } from "../FindPodiums";
import { ClipLoader } from "react-spinners";
import RaceResultsConstructor from "../RaceResultsConstructor";
import FollowButtonTeam from "../FollowButtonTeam";

export default function Team() {
    const { id } = useParams();
    const team = TeamDictionary[id];
    const [loading, setLoading] = useState(true);
    const [standings, setStandings] = useState([]);
    const [totalPodiums, setTotalPodiums] = useState(<ClipLoader size={15} color={"#000000"} loading={true} />);
    const navigate = useNavigate();
    const Drivers = team ? team.drivers : [];

    // Função para carregar standings
    const carregaStandings = () => {
        axios
            .get("https://ergast.com/api/f1/2024/constructorStandings.json")
            .then((response) => {
                const standingsData =
                    response.data?.MRData?.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings || [];
                setStandings(standingsData);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erro ao carregar standings:", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        if (team) {
            carregaStandings();
        }
    }, [team]);

    useEffect(() => {
        if (Drivers.length > 0) {
            const fetchPodiums = async () => {
                let podiumSum = 0;
                for (const driver of Drivers) {
                    try {
                        const podiumCount = await FindPodiums(driver);
                        podiumSum += podiumCount;
                    } catch (error) {
                        console.error("Erro ao buscar pódios para o piloto:", driver, error);
                    }
                }
                setTotalPodiums(podiumSum);
            };
            fetchPodiums();
        }
    }, [Drivers]);

    // Encontre os dados do time em standings e use-os diretamente
    const teamStats = standings.find(
        (constructor) => constructor.Constructor.constructorId.toLowerCase() === id.toLowerCase()
    );


    // Verifique se teamStats foi encontrado
    if (loading) {
        return (
            <div className="loading-container">
                <ClipLoader color="#000000" loading={loading} size={50} />
            </div>
        );
    }

    if (!team) {
        return <p>Team not found</p>;
    }

    return (
        <>
            <AppBar />
            <SideBar />
            <div className="team-page">
                <div className="team-header">
                    <img className="team-logo" src={`/assets/img/Equipes/${id}/logo.png`} alt={teamStats?.Constructor.name} />
                    <h1 className="team-name">{teamStats?.Constructor.name}</h1>
                    <div className="team-stats">
                        <FollowButtonTeam teamId={id} />
                        <span>Position: {teamStats?.position || "N/A"}</span>
                        <span>Points: {teamStats?.points || "N/A"}</span>
                        <span>Wins: {teamStats?.wins || "N/A"}</span>
                        <span>Podiums: {totalPodiums}</span>
                    </div>
                </div>
                <div className="data-body">
                    <div className="race-results">
                        <RaceResultsConstructor teamId={id} />
                    </div>
                    <div className="drivers-section">
                        <h2 className="drivers-title">Drivers</h2>
                        <div className="drivers-list">
                            {Drivers.map((driver) => (
                                <div
                                    className="driver-card-img"
                                    key={driver}
                                    onClick={() => navigate(`/drivers/${driver}`)}
                                >
                                    <img src={`/assets/img/Pilotos/${driver}/card.png`} alt={driver} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}