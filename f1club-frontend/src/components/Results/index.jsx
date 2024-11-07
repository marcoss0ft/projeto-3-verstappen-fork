import { useEffect, useState } from 'react';
import "./index.css";
import ClipLoader from "react-spinners/ClipLoader";
import axios from 'axios';
import AppBar from '../AppBar';
import SideBar from '../SideBar';
import { useNavigate } from "react-router-dom";

export default function Results() {
    const navigate = useNavigate();
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const maxRounds = 24;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const requests = Array.from({ length: maxRounds }, (_, i) =>
                    axios.get(`https://ergast.com/api/f1/2024/${i + 1}/results.json`)
                );
                const raceResults = await Promise.all(requests);
                const extractedResults = raceResults.map(response => 
                    response.data.MRData.RaceTable.Races[0]
                );
                setResults(extractedResults);
            } catch (error) {
                console.error("Erro ao carregar resultados da corrida:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <ClipLoader size={15} className="loading" color={"#000000"} loading={true} />;
    }

    return (
        <>
            <AppBar />
            <SideBar />
            <div className='column'>
            {results.map((result, index) => (
                result && <button key={index} className='bt-race' onClick={() => navigate (`/results/${index+1}/`)}>{result.raceName}</button>
            ))}
            </div>
        </>
    );
}
