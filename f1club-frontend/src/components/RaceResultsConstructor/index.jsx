import { useEffect, useState } from 'react';
import { FindPositionAndPointsInRaceTeam } from "../FindPositionAndPointsInRaceTeam";
import axios from 'axios';
import "./index.css";
import { ClipLoader } from "react-spinners";
export default function RaceResultsConstructor({ teamId }) {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const maxRounds = 24;

    useEffect(() => {
        const fetchRaces = async () => {
            try {
                // Obtenha a lista completa de corridas da temporada
                const response = await axios.get("https://ergast.com/api/f1/2024.json");
                const races = response.data.MRData.RaceTable.Races;

                // Mapeie todas as corridas e preencha os dados de posição/pontos ou com N/A
                const raceResults = await Promise.all(
                    races.map(async (race, index) => {
                        // Busca os resultados da corrida (se a corrida já ocorreu)
                        if (index + 1 <= maxRounds) {
                            const result = await FindPositionAndPointsInRaceTeam({ teamId, round: index + 1 });
                            return {
                                raceName: race.raceName,
                                position: result.position,
                                points: result.points,
                            };
                        }
                        // Retorna N/A para as corridas futuras
                        return { raceName: race.raceName, position: "N/A", points: "N/A" };
                    })
                );

                setResults(raceResults);
            } catch (error) {
                console.error("Erro ao carregar resultados da corrida:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRaces();
    }, [teamId]);

    if (isLoading) {
        return <ClipLoader size={15} className="loading" color={"#000000"} loading={true} />;
    }

    return (
        <table className="race-results-constructor">
            <thead>
                <tr>
                    <th>Race</th>
                    <th>Position</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody>
                {results.map((result, index) => (
                    <tr key={index}>
                        <td>{result.raceName}</td>
                        <td>{result.position}</td>
                        <td>{result.points}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}