import axios from "axios";

export async function FindPodiums(driverId) {
    const maxRounds = 24;
    let podiumCount = 0;

    for (let round = 1; round <= maxRounds; round++) {
        try {
            const response = await axios.get(`https://ergast.com/api/f1/2024/${round}/results.json`);
            const raceResults = response.data.MRData.RaceTable.Races[0]?.Results;

            if (raceResults) {
                const driverResult = raceResults.find(result => result.Driver.driverId === driverId);
                if (driverResult && ["1", "2", "3"].includes(driverResult.position)) {
                    podiumCount += 1;
                }
            }
        } catch (error) {
            console.error(`Erro ao carregar resultados para a rodada ${round}:`, error);
        }
    }

    return podiumCount;
}