import AppBar from "../AppBar";
import SideBar from "../SideBar";
import CardNoticia from "../CardNoticia";
import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

export default function News() {
    const [noticias, setNoticias] = useState([]); 

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/news/")
            .then((response) => setNoticias(response.data))
            .catch((error) => console.error("Error fetching news:", error));
    }, []);
    /*
    useEffect(() => {
        axios.get("https://projeto-3-parte-2-verstappen.onrender.com/news/")
            .then((response) => setNoticias(response.data))
            .catch((error) => console.error("Error fetching news:", error));
    }, []);
    */
    return (
        <>
            <AppBar />
            <SideBar />
            <div className="news-container">
                <h1>Trending</h1>
                <div className="card-noticias-container">
                {noticias.map((noticia, index) => (
                    <CardNoticia key={index} noticia={noticia} />
                ))}
                </div>
            </div>
        </>
    );
}
