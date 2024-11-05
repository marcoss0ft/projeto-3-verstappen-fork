import "./index.css";

export default function Popup({onClose}) {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <p className="message-text2">Incorrect username or password.</p>
                <button className="message-button" onClick={onClose}>OK</button>
            </div>
        </div>
    );
}