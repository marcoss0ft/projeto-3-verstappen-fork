import "./index.css";
import AppBar from "../AppBar";
import SideBar from "../SideBar";
import DriverDictionary from "../DriverDictionary";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import getOrdinalSufix from "../OrdinalSufix";
import { FindPodiums } from "../FindPodiums";
import { FindPoles } from "../FindPoles";
import RaceResultsDriver from "../RaceResultsDriver";
import { ClipLoader } from "react-spinners";
import FollowButtonDriver from "../FollowButtonDriver";

export default function Driver() {
    const { id } = useParams();
    const [standings, setStandings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [podiumCount, setPodiumCount] = useState(null);
    const [poleCount, setPoleCount] = useState(null);
    const navigate = useNavigate();

    const carregaStandings = () => {
        axios
            .get("https://ergast.com/api/f1/2024/driverStandings.json")
            .then((response) => {
                setStandings(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erro ao carregar standings:", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        carregaStandings();
    }, []);

    useEffect(() => {
        const fetchPodiumsAndPoles = async () => {
            try {
                const podiums = await FindPodiums(id);
                setPodiumCount(podiums);
                const poles = await FindPoles(id);
                setPoleCount(poles);
            } catch (error) {
                console.error("Erro ao buscar pódios e poles:", error);
            }
        };
        fetchPodiumsAndPoles();
    }, [id]);

    if (loading) {
        return <ClipLoader size={15} className="loading" color={"#000000"} loading={true} />;
    }

    const driverEntry = Object.entries(DriverDictionary).find(([name, details]) => details.id === id);

    if (!driverEntry) {
        return <p>Piloto não encontrado</p>;
    }

    const driverStats = standings.find((driver) => driver.Driver.driverId === id);
    const position = driverStats ? driverStats.position : <ClipLoader size={15} color={"#123abc"} loading={true} />;
    const points = driverStats ? driverStats.points : <ClipLoader size={15} color={"#123abc"} loading={true} />;
    const wins = driverStats ? driverStats.wins : <ClipLoader size={15} color={"#123abc"} loading={true} />;

    let [driverName, driverDetails] = driverEntry;
    driverName = driverName.toUpperCase();
    const driverFirstName = driverName.split(" ")[0];
    const driverLastName = driverName.split(" ")[1];
    const team = driverDetails.team;

    return (
        <>
            <AppBar />
            <SideBar />
            <div className="container">
                <img className="team" src={`/assets/img/Equipes/${team}/logo.png`} alt={driverName} />
                <div className="name-and-number">
                    <div className="name">
                        <h1 className="firstname">{driverFirstName}</h1>
                        <h1 className="lastname">{driverLastName}</h1>
                    </div>
                    <img className="number" src={`/assets/img/Pilotos/${id}/number.png`} alt={driverName} />
                </div>
                <img className="flag" src={`/assets/img/Pilotos/${id}/flag.png`} alt={driverName} />
                <img className="rosto" src={`/assets/img/Pilotos/${id}/rosto.png`} alt={driverName} />
            </div>
            <div className="base-stats">
                <img className="team-logo" src={`/assets/img/Equipes/${team}/logo.png`} alt={team.name} 
                    onClick={() => navigate(`/teams/${team}`)}
                />
                <FollowButtonDriver driverId={id} />
                <h1 className="base-stats-font">Wins: {wins}</h1>
                <h1 className="base-stats-font">Podiums: {podiumCount !== null ? podiumCount : <ClipLoader size={15} />}</h1>
                <h1 className="base-stats-font">Poles: {poleCount !== null ? poleCount : <ClipLoader size={15} />}</h1>
            </div>
            <div className="position-and-points">
                <h1 className="lastname">{getOrdinalSufix(position)}</h1>
                <div className="points-and-pts">
                    <h1 className="lastname">{points}</h1>
                    <h1 className="lastname">PTS</h1>
                </div>
            </div>
            <RaceResultsDriver driverId={id} />
        </>
    );
}