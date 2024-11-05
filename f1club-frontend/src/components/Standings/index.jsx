import { useEffect, useState } from 'react';
import './index.css';
import AppBar from '../AppBar';
import SideBar from '../SideBar';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';

export default function Standings() {
  const [constructorStandings, setConstructorStandings] = useState([]);
  const [driverStandings, setDriverStandings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const constructorResponse = await axios.get('https://ergast.com/api/f1/2024/constructorStandings.json');
        const driverResponse = await axios.get('https://ergast.com/api/f1/2024/driverStandings.json');

        setConstructorStandings(constructorResponse.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
        setDriverStandings(driverResponse.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch standings:", error);
        setLoading(false);
      }
    };

    fetchStandings();
  }, []);

  if (loading) {
    return <ClipLoader size={15} className="loading" color={"#000000"} loading={true} />;
    }

  return (
    <>
    <AppBar />
    <SideBar />
    <div className="standings-container">
    <div className='standings'>
      <h2 className='standings-title'>Constructor Standings</h2>
      <table className="race-results-standings">
        <thead>
          <tr>
            <th>Position</th>
            <th>Constructor</th>
            <th>Points</th>
            <th>Wins</th>
          </tr>
        </thead>
        <tbody>
          {constructorStandings.map((constructor) => (
            <tr key={constructor.Constructor.constructorId}>
              <td>{constructor.position}</td>
              <td>{constructor.Constructor.name}</td>
              <td>{constructor.points}</td>
              <td>{constructor.wins}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className='standings'>
      <h2 className='standings-title'>Driver Standings</h2>
      <table className="race-results-standings">
        <thead>
          <tr>
            <th>Position</th>
            <th>Driver</th>
            <th>Constructor</th>
            <th>Points</th>
            <th>Wins</th>
          </tr>
        </thead>
        <tbody>
          {driverStandings.map((driver) => (
            <tr key={driver.Driver.driverId}>
              <td>{driver.position}</td>
              <td>{`${driver.Driver.givenName} ${driver.Driver.familyName}`}</td>
              <td>{driver.Constructors[0].name}</td>
              <td>{driver.points}</td>
              <td>{driver.wins}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
    </>
  );
};
