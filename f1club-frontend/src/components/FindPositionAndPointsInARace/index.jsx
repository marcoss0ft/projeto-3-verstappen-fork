import axios from 'axios';

let raceNamesCache = {}; 

async function getRaceName(round) {

    if (raceNamesCache[round]) {
        return raceNamesCache[round];
    }


    try {
        const response = await axios.get("https://ergast.com/api/f1/2024.json");
        const races = response.data.MRData.RaceTable.Races;


        races.forEach(race => {
            raceNamesCache[race.round] = race.raceName;
        });

        return raceNamesCache[round];
    } catch (error) {
        console.error("Erro ao carregar lista de corridas:", error);
        return "N/A";
    }
}

export async function FindPositionAndPointsInARace({ driverId, round }) {
    try {

        const raceName = await getRaceName(round);


        const response = await axios.get(`https://ergast.com/api/f1/2024/${round}/results.json`);
        const raceResults = response.data.MRData.RaceTable.Races[0]?.Results;

        if (!raceResults) return { "position": "N/A", "points": "N/A", "raceName": raceName };

        const driverResult = raceResults.find((result) => result.Driver.driverId === driverId);

        if (!driverResult) return { "position": "N/A", "points": "N/A", "raceName": raceName };

        const position = driverResult.position;
        const points = driverResult.points;
        return { "position": position, "points": points, "raceName": raceName };
    } catch (error) {
        console.error(`Erro ao carregar resultados para a rodada ${round}:`, error);
        return { "position": "N/A", "points": "N/A", "raceName": "N/A" };
    }
}
