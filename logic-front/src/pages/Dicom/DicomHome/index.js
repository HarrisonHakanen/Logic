import { useEffect,useState } from "react";
import styles from "../../../components/Table/Table.module.css";
import "./dicom.css"
import {listarConexaoDicom} from '../../../service/api'
import TableFooter from "../../../components/Table/TableFooter";
import {useNavigate } from 'react-router-dom';
import {useVerificaLogin} from '../../Login/funcoesLogin'
import { IoDocumentTextOutline } from "react-icons/io5";

function DicomHome(){

    const navigate = useNavigate();
    const verificaLogin = useVerificaLogin();

    const [dicomData,setDicomData] = useState();
    const [user,setUser] = useState({});
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const [descricao, setDescricao] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    const [page, setPage] = useState(1);
    const [slice, setSlice] = useState([]);
    const [range, setRange] = useState([]);


    function closeModal(){
        setModalOpen(false);
    }

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('logado');
    };

    const getDescricao = (descricao) => {
        setDescricao(descricao);
        setModalOpen(true);
    }

    function cadastrarDicom(){
        try {
            navigate(`/cadastroDicom`);

        } catch (e) {
            console.log("Erro "+e)
        }
    }

    const calculateRange = ( rowsPerPage) => {
        const range = [];
        const num = Math.ceil(dicomData.length / rowsPerPage);
        let i = 1;
        for (let i = 1; i <= num; i++) {
            range.push(i);
        }
        return range;
    };

    const sliceData = (page, rowsPerPage) => {
        return dicomData.slice((page - 1) * rowsPerPage, page * rowsPerPage);
    };

    async function populaTabela(page, rowsPerPage){
        if (!dicomData || !Array.isArray(dicomData)) {
            console.warn("Dados inválidos ou dicom data não é uma lista:", dicomData);
            return;
        }
        if(dicomData.length>0 ){
            const range = calculateRange(rowsPerPage);
            setRange([...range]);
            
            const sliceNew = sliceData(page, rowsPerPage);
            setSlice([...sliceNew]);
        }
    }

    async function consultaDicom(){
        const response = await listarConexaoDicom();
        let dicom_obj = response.data;

        setDicomData(dicom_obj);
    }

    useEffect(()=>{
        let userRet =  verificaLogin();
        let userRet_Obj = JSON.parse(userRet)
        setUser(userRet_Obj);
        
    },[verificaLogin])

    useEffect(()=>{
        consultaDicom();
    },[])

    useEffect(()=>{
        if (dicomData) {
            populaTabela(page, 2);
        }
    },[dicomData])

    return(
        <>
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
                
            
                <button className="home-button" onClick={cadastrarDicom}>Cadastrar Dicom</button>

                <table className={styles.table}>
                    <thead className={styles.tableRowHeader}>
                        <tr>
                            <th className={styles.tableHeader} style={{ textAlign: 'center' }}>Titulo Ae</th>
                            <th className={styles.tableHeader} style={{ textAlign: 'center' }}>Endereço Ip</th>
                            <th className={styles.tableHeader} style={{ textAlign: 'center' }}>Porta</th>
                            <th className={styles.tableHeader} style={{ textAlign: 'center' }}>Ver descrição</th>
                        </tr>
                    </thead>
                    <tbody>
                    {slice.map((el) => (
                        <tr className={styles.tableRowItems} key={el.idConexaoDicom}>
                            <td style={{ textAlign: 'center' }}>{el.aeTitle}</td>
                            <td style={{ textAlign: 'center' }}>{el.enderecoIp}</td>
                            <td style={{ textAlign: 'center' }}>{el.porta}</td>
                            <td><button onClick={()=>getDescricao(el.descricao)}><IoDocumentTextOutline /></button></td>
                        </tr>
                    ))}
                    
                    </tbody>
                </table>
                <TableFooter range={range} slice={slice} setPage={setPage} page={page} data={dicomData} setRange={setRange} setSlice={setSlice} rowsPerPage={2}/>
            </div>

            {modalOpen &&
            <div className='descricao-modal-style'>
                <div className='descricao-modal-header'>
                    <button onClick={closeModal} className="close-descricao-modal">x</button>
                </div>
                <div className='descricao-modal-content'>
                    
                    <span>
                        {descricao}
                    </span>
                </div>
            </div>
        }
        </>
    )

}
export default DicomHome;
