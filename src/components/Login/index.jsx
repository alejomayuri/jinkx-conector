import { useAuth } from "../../cotext/AuthContext";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const Login = () => {

    const [error, setError] = useState(null)
    const { login } = useAuth();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory();

    const handleEmail = (e) => setEmail(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)

    const handleSubmith = async(e) => {
        e.preventDefault();
        try {
            await login(email, password)
            history.push('/')
        } catch(error) {
            setError('Error en accesos')
        }
    }

    return (
        <div>
            <div>
                {error && <p className='error'>{ error }</p>}
                <h2>Login</h2>
            </div>
            <div>
                <form onSubmit={handleSubmith}>
                    <input type="email" placeholder='email' onChange={handleEmail} />
                    <input type="password" placeholder='contraseña' onChange={handlePassword} />
                    <input type="submit" value='Login' />
                </form>
                <p>No estás registrado? <Link to='/singup'>Regístrate</Link></p>
            </div>
        </div>
    );
}

export default Login;