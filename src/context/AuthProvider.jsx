import { createContext, useEffect, useState } from "react";
import autenticateService from "../servicios/auth.servicios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [usuarioAuth, setUsuarioAuth] = useState({});

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const config = {
          headers: {
            "token": `${token}`
          }
        };
        const { data } = await autenticateService.obtenerPerfil(config);
        setUsuarioAuth(data.usuario);

      } catch (error) {
        console.log(error)
        console.log(error.response.data.msg);
      }
    };

    autenticarUsuario();
  }, []);

  const cerrarSesion = ()=>{
    setUsuarioAuth({})
  }


  return (
    <AuthContext.Provider
      value={{
        usuarioAuth,
        cerrarSesion
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
export {
  AuthProvider
}

export default AuthContext