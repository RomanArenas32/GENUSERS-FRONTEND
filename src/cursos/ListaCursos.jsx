import { useEffect, useState } from "react";
import cursosService from "../servicios/cursos.servicios";
import { Button, Stack } from "react-bootstrap";
import { EditarCurso } from "./EditarCurso";

export const ListaCursos = () => {
  const [cursos, setListaCursos] = useState([]);
  const [mostrarEdicion, setMostrarEdicion] = useState(false);
  const [cursoSeleccionado, setCursoSeleccionado] = useState({});

  useEffect(() => {
    const obtenerCursos = async () => {
      try {
        const resp = await cursosService.listarCursos();
        setListaCursos(resp.data.cursos);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerCursos();
  }, []);

  const editarCurso = (curso)=>{
    setMostrarEdicion(true);
    setCursoSeleccionado(curso)
  }

  const eliminarCurso = async(id)=>{
    try {
      const resp = await cursosService.eliminarCurso(id);
      console.log(resp)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className="d-flex flex-row justify-content-between py-4">
        <h2>Lista de cursos</h2>
        <Button>Agregar curso</Button>
      </div>
      {
        mostrarEdicion && <EditarCurso curso={cursoSeleccionado}/>
      }
      <Stack gap={cursos.length}>
        {cursos.map((curso) => (
          <div
            className="p-2 bg-primary text-white m-2 d-flex flex-row justify-content-between"
            key={curso._id}
          >
            <div>
              <p>{curso.titulo}</p>
              <p>Autor: {curso.autor}</p>
            </div>
            <div className="d-flex flex-col gap-2">
              <Button variant="danger" onClick={()=> eliminarCurso(curso._id)}>eliminar</Button>
              <Button variant="warning" onClick={()=> editarCurso(curso)}>editar</Button>
            </div>
          </div>
        ))}
      </Stack>
    </div>
  );
};
