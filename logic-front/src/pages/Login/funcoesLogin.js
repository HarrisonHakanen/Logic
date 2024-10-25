import {useNavigate } from 'react-router-dom';

export function useVerificaLogin(){

    const navigate = useNavigate();

    const verificaLogin = () => {

        let item = sessionStorage.getItem('logado');

        if (item == null) {
            try {
                navigate(`/`);
            } catch (e) {
                console.log("Erro " + e);
            }
            return null;
        }else{
            return item;
        }
        
    };

    return verificaLogin;
}

export function limpaLogin(){
    sessionStorage.clear();
}