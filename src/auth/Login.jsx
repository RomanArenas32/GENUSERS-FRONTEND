import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import autenticateService from '../servicios/auth.servicios.js'

export const Login = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    correo: '',
    password: '',
  });

  const [alerta, setAlerta] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  }

  const enviarDatos = async (e) => {
    e.preventDefault();
    if (formData.correo == "" || formData.password == "") {
      setAlerta("Los campos no pueden estar vacios");
      return
    }
    try {
      const resp = await autenticateService.loginAuth(formData);
      localStorage.setItem('token', resp.data.token);
      setTimeout(() => {
        navigate('/')
      }, 2000);
    } catch (error) {
      console.log(error)
      setAlerta(error.response.data.msg);
    }
  }

  return (
    <Form className='container flex' onSubmit={enviarDatos}>
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
          Ingresar
        </Button>
        <Form.Text className="text-muted d-flex gap-2">
          No tienes cuenta? <p><Link to="../auth/registro">Registrate</Link></p>.
        </Form.Text>
      </div>
      {alerta !== "" &&
        <div className='alert alert-danger mt-4 text-center' role='alert'>
          {alerta}
        </div>
      }

    </Form>
  );
}
