import axios from 'axios';

const baseURL = 'http://localhost:8080';

const usuariosService = {
    registrarUsuario: async (usuario) => {
        const response = await axios.post(`${baseURL}/user`,usuario)
        return response;
    },
    editarUsuario: async(usuario, id) =>{
        const response = await axios.put(`${baseURL}/user/${id}`, usuario)
        return response;
    },
    listarUsuarios: async() =>{
        const response = await axios.get(`${baseURL}/user`)
        return response;
    },
    banearUsuarios: async(id) =>{
        const response = await axios.put(`${baseURL}/user/ban/${id}`)
        return response;
    },
    usuarioPorNombre: async(nombre) =>{
        const response = await axios.get(`${baseURL}/user/search?keyword=${nombre}`)
        return response;
    },
    
};

export default usuariosService;
