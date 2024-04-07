import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import cursosService from "../servicios/cursos.servicios";

export const EditarCurso = ({ curso }) => {

  const { titulo, autor, sinopsis, precio, urlFoto, _id } = curso;

  const [formData, setFormData] = useState({
    titulo,
    autor,
    sinopsis,
    precio,
    urlFoto,
  });

  const [alerta, setAlerta] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const editarCurso = async (id) => {
    if (
      formData.titulo == "" ||
      formData.autor == "" ||
      formData.precio == "" ||
      formData.sinopsis == "" ||
      formData.urlFoto == ""
    ) {
      setAlerta("Los campos no pueden estar vacios");
      return;
    }
    try {
      const resp = await cursosService.editarCurso(id, formData);
      setSuccess("Curso actualizado");
      
    } catch (error) {
      console.log(error);
      setAlerta(error.response.data.msg);
    }
  };

  return (
  <div>
  <Form className="container mt-4">
      <Form.Group className="mb-3">
        <Form.Label>Titulo</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          id="titulo"
          value={formData.titulo}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Autor</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter autor"
          id="autor"
          value={formData.autor}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Precio</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter autor"
          id="precio"
          value={formData.precio}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>sinopsis</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter sinopsis"
          id="sinopsis"
          value={formData.sinopsis}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>sinopsis</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter sinopsis"
          id="sinopsis"
          value={formData.sinopsis}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>url de la foto</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter photo url"
          id="urlFoto"
          value={formData.urlFoto}
          onChange={handleInputChange}
        />
      </Form.Group>
     
    </Form>
     <div className="d-flex gap-4 mb-4">
        <Button variant="primary" type="submit" onClick={()=>editarCurso(_id) }>
          Editar
        </Button>
      </div>
      {success !== "" && (
        <div className="alert alert-success mt-4 text-center" role="alert">
          {success}
        </div>
      )}
      {alerta !== "" && (
        <div className="alert alert-danger mt-4 text-center" role="alert">
          {alerta}
        </div>
      )}
  </div>
  );
};
