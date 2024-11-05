import axios from "axios";

export async function FindPoles(driverId) {
    const maxRounds = 24;
    let poleCount = 0;

    for (let round = 1; round <= maxRounds; round++) {
        try {
            const response = await axios.get(`https://ergast.com/api/f1/2024/${round}/qualifying.json`);
            const qualifyingResults = response.data.MRData.RaceTable.Races[0]?.QualifyingResults;

            if (qualifyingResults) {
                const driverResult = qualifyingResults.find(result => result.Driver.driverId === driverId);
                if (driverResult && driverResult.position === "1") {
                    poleCount += 1;
                }
            }
        } catch (error) {
            console.error(`Erro ao carregar qualificações para a rodada ${round}:`, error);
        }
    }

    return poleCount;
}