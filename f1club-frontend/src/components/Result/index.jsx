import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import AppBar from "../AppBar";
import SideBar from "../SideBar";
import "./index.css";

export default function Result() {
    const { resultId } = useParams();
    const [result, setResult] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`https://ergast.com/api/f1/2024/${resultId}/results.json`)
            .then((response) => {
                setResult(response.data.MRData.RaceTable);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erro ao carregar resultados da corrida:", error);
                setLoading(false);
            });
    }, [resultId]);

    if (loading) {
        return <ClipLoader size={15} className="loading" color={"#000000"} loading={true} />;
    }

    // Verifique se os dados estão disponíveis antes de acessá-los
    const race = result.Races && result.Races[0];
    const circuit = race && race.Circuit;

    return (
        <div>
            {race ? (
                <>
                    <AppBar/>
                    <SideBar/>
                    <div className="results-page">
                    <h1 className="big-title">{race.raceName}</h1>
                    <div className="date-location">
                    <h2 className="subtitle2">{race.date}</h2>
                    <h2 className="subtitle2">{circuit.circuitName}, {circuit.Location.locality}, {circuit.Location.country}</h2>
                    </div>
                    <table className="race-results-results">
                        <thead>
                            <tr>
                                <th>Position</th>
                                <th>Driver</th>
                                <th>Team</th>
                                <th>Time</th>
                                <th>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {race.Results.map((result, index) => (
                                <tr key={index}>
                                    <td>{result.position}</td>
                                    <td>{result.Driver.givenName} {result.Driver.familyName}</td>
                                    <td>{result.Constructor.name}</td>
                                    <td>{result.Time ? result.Time.time : "N/A"}</td>
                                    <td>{result.points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                </>
            ) : (
                <p>Não há dados disponíveis para esta corrida.</p>
            )}
        </div>
    );
}
