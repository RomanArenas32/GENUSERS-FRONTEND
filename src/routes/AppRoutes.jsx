import { useState, useEffect, useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login, Registro } from "../auth";
import { Home } from "../vistas/Home";
import { Carrito } from "../vistas/Carrito";
import AuthContext from "../context/AuthProvider";
import { Admin } from "../administrador/Admin";
import { EditarUsuarios } from "../usuarios";

export const AppRoutes = () => {
  const { usuarioAuth, cerrarSesion } = useContext(AuthContext);
  const [authCargada, setAuthCargada] = useState(false);

  useEffect(() => {
    if (usuarioAuth) {
      setAuthCargada(true);
    }
  }, [usuarioAuth]);

  if (!authCargada) {
    return <div>Cargando...</div>;
  }

  const rol = usuarioAuth ? usuarioAuth.rol : null;

  return (
    <Routes>
      {/* RUTAS PRIVADAS */}
      {rol === 'ADMIN_ROLE' && <Route path="/admin" element={<Admin />} />
    
    }
      
      {/* RUTAS PÚBLICAS */}
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/registro" element={<Registro />} />
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Carrito />} />
      {
        usuarioAuth.nombre &&  <Route path="/edit" element={<EditarUsuarios />} />
      }
    </Routes>
  );
}
