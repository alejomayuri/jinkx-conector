import { useAuth } from "../../cotext/AuthContext";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const SingUp = () => {

    const [error, setError] = useState(null)

    const { singup } = useAuth();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const history = useHistory();

    const handleEmail = (e) => setEmail(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)
    const handleConfirmPassword = (e) => setConfirmPassword(e.target.value)

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('las contraseñas son distintas')
        } else {
            try {
                await singup(email, password)
                history.push('/')
            } catch(error) {
                setError('Error del servidor')
            }
        }
    }

    return (
        <div>
            <div>
                {error && <p className='error'>{ error }</p>}
                <h2>Sing Up</h2>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder='email' onChange={handleEmail}  />
                    <input type="password" placeholder='contraseña' onChange={handlePassword} />
                    <input type="password" placeholder='confirmar contraseña' onChange={handleConfirmPassword} />
                    <input type="submit" value='Sing Up' />
                </form>
                <p>Ya estás registrado? <Link to='/login'>Iniciar sesión</Link></p>
            </div>
        </div>
    );
}

export default SingUp;