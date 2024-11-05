import { useEffect, useState } from 'react';
import { FindPositionAndPointsInARace } from "../FindPositionAndPointsInARace";
import "./index.css";
import ClipLoader from "react-spinners/ClipLoader";

export default function RaceResultsDriver({ driverId }) {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const maxRounds = 24;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const requests = Array.from({ length: maxRounds }, (_, i) =>
                    FindPositionAndPointsInARace({ driverId, round: i + 1 })
                );
                const raceResults = await Promise.all(requests);
                setResults(raceResults);
            } catch (error) {
                console.error("Erro ao carregar resultados da corrida:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [driverId]);

    if (isLoading) {
        return <ClipLoader size={15} className="loading" color={"#000000"} loading={true} />;
    }

    return (
        <table className="race-results-driver">
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
