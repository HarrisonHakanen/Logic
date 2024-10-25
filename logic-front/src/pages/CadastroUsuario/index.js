import {useForm} from 'react-hook-form'
import "./cadastroUsuario.css"
import {cadastrarUsuario} from '../../service/api'
import {useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'

function CadastroUsuario(){

    const navigate = useNavigate();
    const {register,handleSubmit,formState:{errors}} = useForm();


    function logar(){
        try {
            navigate(`/`);

        } catch (e) {
            console.log("Erro "+e)
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

    const onSubmit = async (data) => {

        try {
            const response = await cadastrarUsuario(data)
            toast.success("Usuário cadastrado com sucesso.");
            logar();
        }catch (error) {
            if (error.response) {
                
                if (error.response.status === 300) {
                    toast.error("Usuário já existe.");
                } else {
                    toast.error("Erro desconhecido, consulte o suporte para mais informações.");
                }
            }else if (error.request) {
               
                console.error("Nenhuma resposta recebida: ", error.request);
                toast.error("O servidor não respondeu. Tente novamente mais tarde.");
            }
        }
    }

    return(
        <>
            <div className="app-container">
                <div className='title-text'>
                    Cadastrar usuário
                </div>
                <div className="form-group">
                    <div class="input-data">
                        <input
                            className={errors?.usuario && "input-error"}
                            type="text"
                            placeholder="Usuário"
                            {...register("usuario",schema.usuario)}
                        />
                        {errors?.usuario && (
                            <p className='error-message'>{errors.usuario.message}</p>
                        )}
                    </div>
                </div>
                <div className="form-group">
                    <div class="input-data">
                        <input
                            className={errors?.senha && "input-error"}
                            type="password"
                            placeholder="Senha"
                            {...register("senha",schema.senha)}
                        />
                        {errors?.senha && (
                            <p className='error-message'>{errors.senha.message}</p>
                        )}
                    </div>
                </div>

                <div className="form-group">
                    <button className='entrar-button' onClick={()=> handleSubmit(onSubmit)()}>Cadastrar</button>
                </div>
                <div className="form-group">
                    <label onClick={logar}>Já possuí cadastro? Entrar  </label>
                </div>
            </div>
        </>
    )
}
export default CadastroUsuario;