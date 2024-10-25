import axios from "axios";


const api = axios.create({
    baseURL: 'http://localhost:8899',
    headers: {
        'Content-Type': 'application/json'
    }
});

export async function criarConexaoDicom(data) {
    const response = await api.post("/ConexaoDicom_", data);
    return response;
}

export async function listarConexaoDicom() {
    const response = await api.get("/ConexaoDicom_");
    return response;
}


export async function login(usuario,senha) {
    const response = await api.get("/Usuario_/login/"+usuario+"/"+senha);
    return response;
}

export async function cadastrarUsuario(data) {
    const response = await api.post("/Usuario_",data);
    return response;
}