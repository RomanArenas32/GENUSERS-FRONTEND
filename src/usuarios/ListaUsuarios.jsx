import { useEffect, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import usuariosService from "../servicios/usuarios.servicios";

export const ListaUsuarios = () => {
  const [usuarios, setListaUsuarios] = useState([]);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const resp = await usuariosService.listarUsuarios();
        const users = resp.data.listaUsuarios.filter(
          (el) => el.rol !== "ADMIN_ROLE"
        );
        setListaUsuarios(users);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerUsuarios();
  }, []);


  const restringirHabilitarUsuario = async(id)=>{
    try {
        const resp = await usuariosService.banearUsuarios(id);
    } catch (error) {
        console.log(error)
    }
  }
  
  return (
    <Stack gap={usuarios.length}>
      {usuarios.map((usuario) => (
        <div
          className="p-2 bg-primary text-white m-2 d-flex flex-row justify-content-between"
          key={usuario._id}
        >
          <div>
            <p>
              {usuario.nombre} {usuario.apellido}
            </p>
            <p>{usuario.correo}</p>
          </div>
          {usuario.estado ? (
            <Button variant="success" onClick={()=>restringirHabilitarUsuario(usuario._id)}>Habilitado</Button>
          ) : (
            <Button variant="danger" onClick={()=>restringirHabilitarUsuario(usuario._id)}>Restringido</Button>
          )}
        </div>
      ))}
    </Stack>
  );
};
