import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css';
import PopupLogin from '../PopupLogin';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const login = (event) => {
        event.preventDefault();

        const data = {
            username: username,
            password: password,
        };
        axios
            .post('https://projeto-3-parte-2-verstappen-fork.onrender.com/token/', data)
            .then((response) => {
                const token = response.data.token;
                localStorage.setItem('username', username);
                localStorage.setItem('token', token);
                setUsername('');
                setPassword('');
                navigate('/');
            })
            .catch((e) => {
                console.log(`Erro no login: ${e}`);
                setError(true);
            });
    }

    return (
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form onSubmit={login}>
                <label>
                    <p>Username</p>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        onChange={(event) => setUsername(event.target.value)} 
                    />
                </label>
                <label>
                    <p>Password</p>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </label>
                <div>
                    <button className="form-button" type="submit">Submit</button>
                </div>
            </form>
            <h1>Don't have an account?</h1>
            <button className="form-button" onClick={() => navigate('/register')}>Register</button>
            {error && <PopupLogin onClose={() => setError(false)} />}
        </div>
    )
}