import "./index.css";

export default function Popup({ message, onClose, onConfirm }) {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <p className="message-text">{message}</p>
                <button className="message-button" onClick={onConfirm}>Yes</button>
                <button className="message-button" onClick={onClose}>No</button>
            </div>
        </div>
    );
}