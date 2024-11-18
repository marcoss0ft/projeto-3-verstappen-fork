import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const cadastro = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        const data = { username, email, password };

        try {

            await axios.post(
                'https://projeto-3-parte-2-verstappen-fork.onrender.com/users/', 
                JSON.stringify(data), 
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            const response = await axios.post(
                'https://projeto-3-parte-2-verstappen-fork.onrender.com/token/', 
                JSON.stringify({ username, password }), 
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );


            const token = response.data.token;
            localStorage.setItem('username', username);
            localStorage.setItem('token', token);

            setUsername('');
            setEmail('');
            setPassword('');
            navigate('/');
        } catch (error) {
            if (error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error status:', error.response.status);
                setError(`Error: ${error.response.data}`);
            } else {
                console.error('Error:', error.message);
                setError("An unexpected error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-wrapper">
            <h1>Register</h1>
            <form onSubmit={cadastro}>
                <label>
                    <p>Username</p>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        value={username}
                        onChange={(event) => setUsername(event.target.value)} 
                    />
                </label>
                <label>
                    <p>Email</p>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={email}
                        onChange={(event) => setEmail(event.target.value)} 
                    />
                </label>
                <label>
                    <p>Password</p>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </label>
                {error && <p className="error-message">{error}</p>}
                <div>
                    <button className='form-button' type="submit" disabled={isLoading}>
                        {isLoading ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    );
}