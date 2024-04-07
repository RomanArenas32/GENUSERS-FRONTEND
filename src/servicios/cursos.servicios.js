import axios from 'axios';
const baseURL = 'http://localhost:8080';

const cursosService = {
  registrarCurso: async (curso) => {
    const response = await axios.post(`${baseURL}/curso`, curso)
    return response;
  },
  editarCurso: async (id, curso) => {
    const response = await axios.put(`${baseURL}/curso/${id}`, curso)
    return response;
  },
  listarCursos: async () => {
    const response = await axios.get(`${baseURL}/curso`)
    return response;
  },
  eliminarCurso: async (id) => {
    const response = await axios.delete(`${baseURL}/curso/${id}`)
    return response;
  },
  cusrsoPorNombre: async(nombre) =>{
        const response = await axios.get(`${baseURL}/curso/search?keyword=${nombre}`)
        return response;
    },
};

export default cursosService;