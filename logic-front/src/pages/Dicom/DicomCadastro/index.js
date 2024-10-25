import {useForm} from 'react-hook-form'
import {useVerificaLogin} from '../../Login/funcoesLogin'
import "./dicom_cadastro.css"
import {criarConexaoDicom} from '../../../service/api'
import { useEffect,useState} from "react";
import {toast} from 'react-toastify'
import {useNavigate } from 'react-router-dom';

function DicomCadastro(){

    const navigate = useNavigate();
    const {register,handleSubmit,formState:{errors}} = useForm();
    const verificaLogin = useVerificaLogin();
    const [user,setUser] = useState({});
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('logado');
        
    };

    const onSubmit = async (data) => {

        try {
            const response = await criarConexaoDicom(data)
            toast.success("DICOM cadastrado com sucesso.");

            try {
                navigate(`/listagemDicom`);
    
            } catch (e) {
                console.log("Erro "+e)
            }

        }catch (error) {
            if (error.response) {
                
                if (error.response.status === 450) {
                    toast.error("O título AE já existe.");
                } else if (error.response.status === 451) {
                    toast.error("A descrição deve ter entre 2 e 255 caracteres.");
                } else if (error.response.status === 452) {
                    toast.error("O AE Title deve ter entre 4 e 255 caracteres.");
                } else if (error.response.status === 453) {
                    toast.error("O endereço IP deve ter entre 2 e 255 caracteres.");
                } else {
                    toast.error("Erro desconhecido.");
                }
            }else if (error.request) {
               
                console.error("Nenhuma resposta recebida: ", error.request);
                toast.error("O servidor não respondeu. Tente novamente mais tarde.");
            }
        }
    }

    const schema = {
        descricao: {
            required: "Descrição é obrigatória",
            minLength: {
                value: 2,
                message: "Descrição deve ter no mínimo 2 caracteres"
            },
            maxLength: {
                value: 255,
                message: "Descrição deve ter no máximo 255 caracteres"
            }
        },
        aeTitle:{
            required: "Título Ae é obrigatório",
            minLength: {
                value: 4,
                message: "Título Ae deve ter no mínimo 4 caracteres"
            },
            maxLength: {
                value: 255,
                message: "Título Ae deve ter no máximo 255 caracteres"
            }
        },
        enderecoIp: {
            required: "Endereço IP é obrigatório",
            minLength: {
                value: 2,
                message: "Endereço IP deve ter no mínimo 2 caracteres"
            },
            maxLength: {
                value: 255,
                message: "Endereço IP deve ter no máximo 255 caracteres"
            }
        },
        porta: {
            required: "Porta é obrigatória",
            validate: {
                range: value => {
                    const numero = parseFloat(value);
                    return (numero >= 1 && numero <= 65536) || "Valor deve estar entre 1 e 65536";
                }
            }
        }
    };


    useEffect(()=>{
        
        let userRet =  verificaLogin();
        let userRet_Obj = JSON.parse(userRet)
        setUser(userRet_Obj);

    },[verificaLogin])

    return(<>
        <div className='dicom-content'>
        {user && user.usuario && (
            <div className="user-menu">
                <span onClick={toggleDropdown} className="username">
                    {user.usuario}
                </span>

                {dropdownVisible && (
                    <div className="dropdown">
                        <button onClick={handleLogout} className="logout-button">
                            Sair
                        </button>
                    </div>
                )}
            </div>
        )}
        </div>
        <div className="app-container">

            
            <div className='title-text'>
                Cadastrar Dicom
            </div>
            <div className="form-group">
                <div class="input-data">
                    <input
                        className={errors?.aeTitle && "input-error"}
                        type="text"
                        placeholder="Título ae"
                        {...register("aeTitle",schema.aeTitle)}
                    />
                </div>
                {errors?.aeTitle && (
                    <p className='error-message'>{errors.aeTitle.message}</p>
                )}
            </div>
            <div className="form-group">
                <div class="input-data">
                    <input
                        className={errors?.descricao && "input-error"}
                        type="text"
                        placeholder="Descrição"
                        {...register("descricao",schema.descricao)}
                    />
                </div>
                {errors?.descricao && (
                    <p className='error-message'>{errors.descricao.message}</p>
                )}
            </div>
            <div className="form-group">
                <div class="input-data">
                    <input
                        className={errors?.enderecoIp && "input-error"}
                        type="text"
                        placeholder="Endereço Ip"
                        {...register("enderecoIp",schema.enderecoIp)}
                    />
                </div>
                {errors?.enderecoIp && (
                    <p className='error-message'>{errors.enderecoIp.message}</p>
                )}
            </div>

            <div className="form-group">
                <div class="input-data">
                    <input
                        className={errors?.porta && "input-error"}
                        type="text"
                        placeholder="Porta"
                        {...register("porta",schema.porta)}
                    />
                </div>
                {errors?.porta && (
                    <p className='error-message'>{errors.porta.message}</p>
                )}
            </div>

            <div className="form-group">
                <button className='entrar-button' onClick={()=> handleSubmit(onSubmit)()}>Criar DICOM</button>
            </div>
        </div>

    
    </>)

}
export default DicomCadastro;