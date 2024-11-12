import { Link } from "react-router-dom";
import "./index.css";

export default function CardNoticia({ noticia }) {
    return (
        <Link className="card-noticia" to={noticia.link}>
            <img src={noticia.imagem} alt="img-noticia" />
            <h2>{noticia.titulo}</h2>
        </Link>
    );
}
