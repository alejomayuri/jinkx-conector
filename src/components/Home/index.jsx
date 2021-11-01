import { useAuth } from "../../cotext/AuthContext";
import { useState, useEffect } from "react";
import { getFirestore } from "../../firebase";
import firebase from "@firebase/app-compat";
import 'firebase/compat/firestore'

function Home() {

    const { currentUser, logout } = useAuth()

    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        nombre: '',
    })
    const [archivosUser, setArchivosUser] = useState([])
    const [gancho, setGancho] = useState(false)

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            setError('Error del servidor')
        }
    }
    console.log(currentUser.uid)

    const handleOnChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
            
        })
    }

    const subirArchivos = (e) => {

        e.preventDefault()

        let archivo = {};

        archivo.userId = currentUser.uid
        archivo.document = formData


        const db = getFirestore();
        db.collection('archivos').add(archivo)
            .then((res) => console.log(res))
            .catch(err => console.log(err))

        setGancho(!gancho)
    }

    useEffect(() => {
        const dbQuery = getFirestore()
        const traer = dbQuery.collection('archivos')

        traer.get().then(({docs}) => {
            setArchivosUser(docs.map(doc => ({id: doc.id, ...doc.data()})))
        })
    }, [gancho])
    console.log(gancho)
    return (
        <div>
            <div>
                {error && <p>{error}</p>}
                <img src="./logo-jinkx.png" alt="user" />
            </div>
            <div>
                <h2>Bienvenido</h2>
                <p>{currentUser.email}</p>
                <form id="form-checkout" action=""
                    onSubmit={subirArchivos}
                    onChange={handleOnChange}
                >
                    <input required type="text" name='nombre' placeholder='Nombre' value={formData.nombre} />
                    <button>Subir archivos</button>
                </form>
                <button onClick={handleLogout}>Logout</button>
                <div>
                    <h3>Mis archivos</h3>
                    {
                        archivosUser?
                        archivosUser.filter(item => currentUser.uid === item.userId).map(item => (
                            <p>{item.document.nombre}</p>
                        ))
                        :
                        <p>no hay archivos</p>
                    }
                </div>
            </div>
        </div>
    );
}

export default Home;
