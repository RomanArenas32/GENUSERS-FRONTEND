import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import usuariosService from '../servicios/usuarios.servicios';

export const Registro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    password: '',
    rol: "USER_ROLE"
  });

  const [alerta, setAlerta] = useState("");
  const [success, setSuccess] = useState("");


  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  }

  const enviarDatos = async (e) => {
    e.preventDefault();
    if (formData.correo == "" || formData.password == "" || formData.nombre == "" || formData.apellido == "") {
      setAlerta("Los campos no pueden estar vacios");
      return
    }
    try {
      const resp = await usuariosService.registrarUsuario(formData);
      setSuccess(resp.data.msg);
      setTimeout(() => {
        navigate('/auth/login')
      }, 2000);
    } catch (error) {
      console.log(error)
      setAlerta(error.response.data.msg);
    }
  }

  return (
    <Form className='container flex' onSubmit={enviarDatos}>
      <Form.Group className="mb-3">
        <Form.Label>Nombre</Form.Label>
        <Form.Control type="text" placeholder="Enter name" id="nombre" value={formData.nombre} onChange={handleInputChange} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Apellido</Form.Label>
        <Form.Control type="text" placeholder="Enter lastname" id="apellido" value={formData.apellido} onChange={handleInputChange} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Correo</Form.Label>
        <Form.Control type="email" placeholder="Enter email" id="correo" value={formData.correo} onChange={handleInputChange} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" placeholder="Password" id="password" value={formData.password} onChange={handleInputChange} />
      </Form.Group>
      <div className='d-flex gap-4'>
        <Button variant="primary" type="submit">
          Registrarse
        </Button>
        <Form.Text className="text-muted d-flex gap-2">
          Ya tienes cuenta? <p><Link to="../auth/login">Ingresa</Link></p>.
        </Form.Text>
      </div>
      {success !== "" &&
        <div className='alert alert-success mt-4 text-center' role='alert'>
          {success}
        </div>
      }
      {alerta !== "" &&
        <div className='alert alert-danger mt-4 text-center' role='alert'>
          {alerta}
        </div>
      }
    </Form>
  );
}
