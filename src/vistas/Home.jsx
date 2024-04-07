import { useState } from "react"
import { useEffect } from "react"
import cursosService from "../servicios/cursos.servicios";
import { Button, Card, Container, ListGroup } from "react-bootstrap";
import image from '../assets/tecnoo.svg'

export const Home = () => {

    const [cursos, setCursos] = useState([]);

    useEffect(() => {
        const obtenerCursos = async () => {
            const resp = await cursosService.listarCursos();
            setCursos(resp.data.cursos)
        }
        obtenerCursos();
    }, []);


    const [carrito, setCarrito] = useState([]);

    useEffect(() => {
        const storedCart = localStorage.getItem('carrito');
        if (storedCart) {
            setCarrito(JSON.parse(storedCart));
        }
    }, []);

    const agregarCarrito = (curso)=>{
         const cursoExistente = carrito.find(item => item._id === curso._id);
         if (cursoExistente) {
             const nuevoCarrito = carrito.map(item => {
                 if (item._id === curso._id) {
                     return { ...item, cantidad: item.cantidad + 1 };
                 }
                 return item;
             });
             setCarrito(nuevoCarrito);
             localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
         } else {
             const nuevoCarrito = [...carrito, { ...curso, cantidad: 1 }];
             setCarrito(nuevoCarrito);
             localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
         }
    }

    
    return (
        <Container className="mt-4 d-flex flex-wrap gap-4">

            {
                cursos.map(curso => (
                    <Card style={{ width: '18rem' }} key={curso._id}>
                        <Card.Img variant="top" src={image} />
                        <Card.Body>
                            <Card.Title>{curso.titulo}</Card.Title>
                            <Card.Text>
                                {curso.sinopsis}
                            </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>by {curso.autor}</ListGroup.Item>
                            <ListGroup.Item>USD {curso.precio}</ListGroup.Item>
                        </ListGroup>
                        <Button variant="primary" onClick={()=> agregarCarrito(curso)}>
                            Agregar al carrito
                        </Button>
                    </Card>
                ))
            }
        </Container>
    )
}
