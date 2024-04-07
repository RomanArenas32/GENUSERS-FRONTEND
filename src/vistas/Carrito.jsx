import { useContext, useEffect, useState } from "react";
import AuthContext from '../context/AuthProvider';
import { Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export const Carrito = () => {
    const [carrito, setCarrito] = useState([]);

    const { usuarioAuth } = useContext(AuthContext);
    const navigate = useNavigate();


    useEffect(() => {
        const storedCart = localStorage.getItem('carrito');
        if (storedCart) {
            setCarrito(JSON.parse(storedCart));
        }
    }, []);

    const totalAPagar = carrito.reduce((total, curso) => total + curso.precio * curso.cantidad, 0);

    const vaciarCarrito = ()=>{
        localStorage.clear();
    }

    const comprarProductos = ()=>{
        if(usuarioAuth.nombre){
            alert('Productos adquiridos')
        }
        else{
            navigate('../auth/login')
        }
    }


    return (
        <div className="container">
            <h2 className="my-4">Carrito de compras</h2>
            <Stack gap={carrito.length}>
                {carrito.map(curso => (
                    <div className="p-2 bg-primary text-white" key={curso._id} >
                        <p>{curso.titulo} </p>
                        <p>{curso.precio} USD</p>
                        <p>cantidad: {curso.cantidad}</p>
                    </div>
                ))}
            </Stack>
            <h2 className="my-4">Total a pagar: {totalAPagar} USD</h2>
            <div className="mt-4">
                <Button variant="danger" onClick={vaciarCarrito}>Vaciar Carrito</Button>{' '}
                <Button variant="success" onClick={comprarProductos}>Comprar</Button>
            </div>
        </div>
    );
};