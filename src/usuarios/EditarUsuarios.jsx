import { useContext, useState } from "react";
import AuthContext from "../context/AuthProvider";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import usuariosService from "../servicios/usuarios.servicios";

export const EditarUsuarios = () => {

  const { usuarioAuth } = useContext(AuthContext);
  const {nombre, apellido, password, correo, rol} = usuarioAuth;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: nombre,
    apellido: apellido,
    correo: correo,
    password: password,
    rol: rol
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

  const editarUsuario = async () => {
   
    if (
      formData.password == "" ||
      formData.nombre == "" ||
      formData.apellido == ""
    ) {
      setAlerta("Los campos no pueden estar vacios");
      return;
    }
    try {
      const resp = await usuariosService.editarUsuario(formData);
      setSuccess("Usuario actualizado correctamente");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log(error);
      setAlerta("Error al actualizar el usuario");
    }
  };

  return (
    <div>
      <Form className="container my-4">
        <h2>Editar usuario</h2>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            id="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter lastname"
            id="apellido"
            value={formData.apellido}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </Form.Group>

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
      </Form>
      <div className="d-flex gap-4 container">
        <Button variant="primary" type="submit" onClick={()=> editarUsuario(formData)}>
          Editar
        </Button>
      </div>
    </div>
  );
};
