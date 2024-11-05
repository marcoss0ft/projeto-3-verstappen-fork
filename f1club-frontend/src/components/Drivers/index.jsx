import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import AppBar from "../AppBar";
import SideBar from "../SideBar";
import DriverDictionary from "../DriverDictionary";
import SearchBox from "../SearchBox";

export default function Drivers() {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const filteredDrivers = Object.entries(DriverDictionary)
        .filter(([name, details]) => 
            name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            details.team.toLowerCase().includes(searchTerm.toLowerCase())
        );

    return (
        <>
            <AppBar />
            <SideBar />
            <SearchBox onSearch={setSearchTerm} />

            <div className="card-container">
                {filteredDrivers.length > 0 ? (
                    filteredDrivers.map(([name, details], index) => (
                        <img 
                            key={index}
                            className="driver-card" 
                            src={`/assets/img/Pilotos/${details.id}/card.png`} 
                            alt={name} 
                            onClick={() => navigate(`/drivers/${details.id}/`)}
                            style={{ cursor: 'pointer' }}
                        />
                    ))
                ) : (
                    <p className="no-drivers-found">No drivers found</p>
                )}
            </div>
        </>
    );
}
