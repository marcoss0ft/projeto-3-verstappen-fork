import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import AppBar from "../AppBar";
import SideBar from "../SideBar";
import TeamDictionary from "../TeamDictionary";
import SearchBox from "../SearchBox";

export default function Teams() {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const filteredItems = Object.entries(TeamDictionary)
        .filter(([name, details]) => 
            (name && name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (details.team && details.team.toLowerCase().includes(searchTerm.toLowerCase()))
        );

    return (
        <>
            <AppBar />
            <SideBar />
            <SearchBox onSearch={setSearchTerm} />

            <div className="card-container">
                {filteredItems.length > 0 ? (
                    filteredItems.map(([name, details], index) => (
                        <img 
                            key={index}
                            className="team-card" 
                            src={`/assets/img/Equipes/${details.id}/card.png`} 
                            alt={name} 
                            onClick={() => navigate(`/teams/${details.id}/`)}
                            style={{ cursor: 'pointer' }}
                        />
                    ))
                ) : (
                    <p className="no-teams-found">No teams found</p>
                )}
            </div>
        </>
    );
}
