import axios from 'axios';

const baseURL = 'http://localhost:8080';

const autenticateService = {
    loginAuth: async (formulario) => {
        const response = await axios.post(`${baseURL}/login`,  formulario );
        return response;
    },
    obtenerPerfil: async (token) => {
        const response = await axios.get(`${baseURL}/perfil`, token);
        return response;
    },
};

export default autenticateService;
