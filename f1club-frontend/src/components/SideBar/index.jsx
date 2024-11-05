import "./index.css";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
    const navigate = useNavigate();

    return (
        <div className="sidebar">
            <div className="spacer"></div>
            <button onClick={() => navigate("/favorites/")}>
                <img src="/Icons/like.png" alt="Favorite" className="icon" />
            </button>
        </div>
    );
}
