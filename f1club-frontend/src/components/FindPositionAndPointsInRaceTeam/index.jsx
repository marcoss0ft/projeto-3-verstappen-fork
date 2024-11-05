import axios from "axios";

export async function FindPositionAndPointsInRaceTeam({ teamId, round }) {
    try {
        const response = await axios.get(`https://ergast.com/api/f1/2024/${round}/constructors/${teamId}/results.json`);
        const raceData = response.data.MRData.RaceTable.Races[0];

        // Verifique se há dados da corrida antes de acessar as propriedades
        if (!raceData) {
            return { raceName: `Round ${round}`, position: "N/A", points: "N/A" };
        }

        // Calcule a posição mais alta (menor valor) e pontos totais para a equipe na corrida
        const totalPoints = raceData.Results.reduce((sum, result) => sum + parseFloat(result.points), 0);
        const bestPosition = raceData.Results.reduce(
            (minPosition, result) => Math.min(minPosition, parseInt(result.position)),
            Infinity
        );

        return {
            raceName: raceData.raceName,
            position: bestPosition !== Infinity ? bestPosition : "N/A",
            points: totalPoints.toString(),
        };
    } catch (error) {
        console.error("Erro ao buscar posição e pontos:", error);
        return { raceName: `Round ${round}`, position: "N/A", points: "N/A" };
    }
}