import './login.css'
import {useForm} from 'react-hook-form'
import {login} from '../../service/api'
import {useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'


function Login(){

    const navigate = useNavigate();
    const {register,handleSubmit,formState:{errors}} = useForm();


    function cadastrarUsuario(){
        try {
            navigate(`/cadastroUsuario`);

        } catch (e) {
            console.log("Erro "+e)
        }
    }

    const onSubmit = async (data) => {

        try {
            const response = await login(data.usuario,data.senha)
            if(response.status == 200){

                toast.success("Logado com sucesso.");
                sessionStorage.setItem('logado', JSON.stringify(data));
                
                try {
                    navigate(`/listagemDicom`);
        
                } catch (e) {
                    console.log("Erro "+e)
                }


            }else if (response.status === 201) {
                toast.error("Usuário não encontrado.");
            } else if (response.status === 300) {
                toast.error("Mais de um usuário encontrado, favor entrar em contato com o suporte.");
            } else if (response.status === 500) {
                toast.error("Ops, ocorreu um erro em nossos servidores. Por favor, tente mais tarde ou entre em contato com o suporte.");
            } else {
                toast.error("Erro desconhecido.");
            }

        }catch (error) {

            if (error.request) {
                console.error("Nenhuma resposta recebida: ", error.request);
                toast.error("O servidor não respondeu. Tente novamente mais tarde.");
            }
        }
    }

    const schema = {
        usuario: {
            required: "Usuário é obrigatório",
            minLength: {
                value: 2,
                message: "Usuário deve ter no mínimo 2 caracteres"
            },
            maxLength: {
                value: 20,
                message: "Usuário deve ter no máximo 20 caracteres"
            }
        },
        senha:{
            required: "Senha é obrigatória",
            minLength: {
                value: 4,
                message: "Senha deve ter no mínimo 4 caracteres"
            },
            maxLength: {
                value: 255,
                message: "Senha deve ter no máximo 255 caracteres"
            }
        }
    };

    return(
    <>
        <div className="app-container">
            <div className='title-text'>
                Login
            </div>
            <div className="form-group">
                <div class="input-data">
                    <input
                        className={errors?.usuario && "input-error"}
                        type="text"
                        placeholder="Usuário"
                        {...register("usuario",schema.usuario)}
                    />
                </div>
                {errors?.usuario && (
                    <p className='error-message'>{errors.usuario.message}</p>
                )}
            </div>

            <div className="form-group">
                <div class="input-data">
                    <input
                        className={errors?.senha && "input-error"}
                        type="password"
                        placeholder="Senha"
                        {...register("senha",schema.senha)}
                    />
                </div>
                {errors?.senha && (
                    <p className='error-message'>{errors.senha.message}</p>
                )}
            </div>
                
            <div className="form-group">
                <button className='entrar-button' onClick={()=> handleSubmit(onSubmit)()}>Entrar</button>
            </div>
            <div className="form-group">
                <label onClick={cadastrarUsuario}>Cadastre-se  </label>
            </div>
        </div>
    </>)
}

export default Login;