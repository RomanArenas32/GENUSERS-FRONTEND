import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaCartArrowDown } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';


export const Navegacion = () => {

    const navigate = useNavigate();
    const { usuarioAuth, cerrarSesion } = useContext(AuthContext);


    return (
        <Navbar bg="primary" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#"><h1 className='font-weight-bold '>GEN<span className='text-danger'>USERS</span></h1></Navbar.Brand>
                <Nav className='d-flex gap-4'>
                    <Link to="/" className="text-white text-decoration-none font-weight-normal">Home</Link>
                    {
                        usuarioAuth.nombre
                            ? 
                            <>
                            <Link className="text-white text-decoration-none font-weight-normal" onClick={()=> cerrarSesion}>Cerrar sesion</Link>
                            <Link className="text-white text-decoration-none font-weight-normal" to="/edit">Perfil</Link>
                            </>
                        
                            :
                            <Link to="/auth/login" className="text-white text-decoration-none font-weight-normal">Iniciar Sesion</Link>
                    }
                </Nav>
                <Nav.Link>
                    <FaCartArrowDown className='display-6 cursor-pointer' onClick={()=> navigate('/cart')}/>
                </Nav.Link>
            </Container>
        </Navbar>
    )
}